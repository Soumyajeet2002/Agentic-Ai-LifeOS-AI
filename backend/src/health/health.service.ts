import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  getApplicationHealth() {
    return {
      status: 'ok',
      service: 'lifeos-backend',
      timestamp: new Date().toISOString(),
    };
  }

  async getDatabaseHealth() {
    const isConnected = this.dataSource.isInitialized;

    if (!isConnected) {
      return {
        status: 'error',
        database: 'disconnected',
      };
    }

    try {
      await this.dataSource.query('SELECT 1');

      return {
        status: 'ok',
        database: 'connected',
      };
    } catch {
      return {
        status: 'error',
        database: 'unavailable',
      };
    }
  }
}