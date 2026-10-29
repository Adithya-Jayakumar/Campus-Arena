import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Provides health checks and Prometheus-compatible metrics for Kubernetes probes and APM tools
 */
@Controller()
export class MetricsController {
  private startTime = Date.now();

  constructor(private prisma: PrismaService) {}

  @Get('health')
  async healthCheck() {
    let dbStatus = 'healthy';
    let dbLatencyMs = 0;

    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbLatencyMs = Date.now() - start;
    } catch {
      dbStatus = 'degraded';
    }

    const memoryUsage = process.memoryUsage();

    return {
      status: 'UP',
      service: 'campus-arena-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryHeapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        memoryRssMB: Math.round(memoryUsage.rss / 1024 / 1024),
      },
    };
  }

  @Get('metrics')
  async getPrometheusMetrics() {
    const memory = process.memoryUsage();
    const uptime = (Date.now() - this.startTime) / 1000;

    // Prometheus plain-text exposition format
    return [
      '# HELP process_uptime_seconds The process uptime in seconds.',
      '# TYPE process_uptime_seconds gauge',
      `process_uptime_seconds ${uptime}`,
      '# HELP nodejs_heap_size_used_bytes Process heap size used from Node.js in bytes.',
      '# TYPE nodejs_heap_size_used_bytes gauge',
      `nodejs_heap_size_used_bytes ${memory.heapUsed}`,
      '# HELP nodejs_rss_bytes Resident Set Size in bytes.',
      '# TYPE nodejs_rss_bytes gauge',
      `nodejs_rss_bytes ${memory.rss}`,
    ].join('\n');
  }
}
