/**
 * Product Exposure Intelligence Agent
 * Links raw component bottlenecks to specific end-consumer product SKUs.
 */
import { INITIAL_WORLD_GRAPH } from '../../services/worldGraphEngine';

export class ProductExposureAgent {
  constructor() {
    this.name = 'Product Exposure Agent';
    this.id = 'ag-product';
  }

  getExposedProducts() {
    const products = INITIAL_WORLD_GRAPH.nodes.filter(n => n.type === 'product');
    return {
      agentId: this.id,
      productCount: products.length,
      products
    };
  }
}

export const productExposureAgent = new ProductExposureAgent();
