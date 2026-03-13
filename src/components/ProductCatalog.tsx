import React, { useState, useMemo, useEffect } from 'react';
import { CreditCard as Edit2, Download, Eye, X, FileText, ArrowUpDown, Info } from 'lucide-react';
import { mockProducts } from '../utils/mockData';
import { Product } from '../types';

type SortField = 'name' | 'category' | 'type' | 'basePrice' | 'yourPrice' | 'maxDiscount' | 'defaultCommission';
type SortDirection = 'asc' | 'desc';

interface PriceHistory {
  id: string;
  oldPrice: number;
  newPrice: number;
  effectiveDate: string;
  changedAt: string;
  reason?: string;
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [priceChangeReason, setPriceChangeReason] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const categories = ['all', 'F&B', 'IT', 'Property', 'Manufacturing', 'Services', 'Education', 'Healthcare', 'Retail', 'Finance', 'Other'];
  const types = ['Single Course', 'Package', 'Consulting'];
  const itemsPerPage = 20;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditingProduct(null);
        setSelectedProduct(null);
        setShowConfirmation(false);
        setShowPriceHistory(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.type));
    }

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [products, searchTerm, selectedCategory, selectedTypes, sortField, sortDirection]);

  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handlePriceUpdate = () => {
    if (!editingProduct || !newPrice) return;
    const price = parseFloat(newPrice);
    const maxAllowedPrice = editingProduct.basePrice * (1 - editingProduct.maxDiscount / 100);

    if (price < maxAllowedPrice) {
      alert(`Price must be at least RM ${maxAllowedPrice.toFixed(2)}`);
      return;
    }

    if (price === editingProduct.yourPrice) {
      alert('New price is the same as current price');
      return;
    }

    setShowConfirmation(true);
  };

  const confirmPriceChange = () => {
    if (!editingProduct || !newPrice) return;
    const price = parseFloat(newPrice);

    const historyEntry: PriceHistory = {
      id: Date.now().toString(),
      oldPrice: editingProduct.yourPrice,
      newPrice: price,
      effectiveDate: effectiveDate,
      changedAt: new Date().toISOString(),
      reason: priceChangeReason
    };

    setPriceHistory(prev => [historyEntry, ...prev]);

    setProducts(products.map(p =>
      p.id === editingProduct.id ? { ...p, yourPrice: price } : p
    ));

    setShowConfirmation(false);
    setEditingProduct(null);
    setNewPrice('');
    setPriceChangeReason('');
    setEffectiveDate(new Date().toISOString().split('T')[0]);
  };

  const viewPriceHistory = (product: Product) => {
    setSelectedProduct(product);
    setShowPriceHistory(true);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown size={14} className={sortField === field ? 'text-blue-600' : 'text-gray-400'} />
      </div>
    </th>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Product Name or SKU</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Product Type</label>
          <div className="flex flex-wrap gap-3">
            {types.map(type => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
            {selectedTypes.length > 0 && (
              <button
                onClick={() => setSelectedTypes([])}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2">
            <Download size={18} /> Export to CSV
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2">
            <Download size={18} /> Export to Excel
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Products ({filteredProducts.length})</h3>
          <span className="text-sm text-gray-600">Page {page} of {totalPages || 1}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <SortableHeader field="name">Product Name</SortableHeader>
                <SortableHeader field="category">Category</SortableHeader>
                <SortableHeader field="type">Type</SortableHeader>
                <th
                  className="px-6 py-3 text-right text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('basePrice')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Base Price
                    <ArrowUpDown size={14} className={sortField === 'basePrice' ? 'text-blue-600' : 'text-gray-400'} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-right text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('yourPrice')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Your Price
                    <ArrowUpDown size={14} className={sortField === 'yourPrice' ? 'text-blue-600' : 'text-gray-400'} />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-right text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors group relative"
                  onClick={() => handleSort('maxDiscount')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Max Discount
                    <Info size={14} className="text-gray-400" />
                    <ArrowUpDown size={14} className={sortField === 'maxDiscount' ? 'text-blue-600' : 'text-gray-400'} />
                  </div>
                  <div className="invisible group-hover:visible absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                    Maximum discount you can offer from HQ base price
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-right text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('defaultCommission')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Commission
                    <ArrowUpDown size={14} className={sortField === 'defaultCommission' ? 'text-blue-600' : 'text-gray-400'} />
                  </div>
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.type}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">RM {product.basePrice}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold text-blue-600">RM {product.yourPrice}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{product.maxDiscount}%</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-700">{product.defaultCommission}%</td>
                  <td className="px-6 py-4 text-center text-sm">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setNewPrice(product.yourPrice.toString());
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit Price"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, page - 2) + i;
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded-lg font-medium ${
                    page === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Price Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Set Price - {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Base Price (HQ): RM {editingProduct.basePrice}</p>
                <p className="text-sm text-gray-600 mb-4">Max Discount: {editingProduct.maxDiscount}%</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Price (RM)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Effective Date</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason (Optional)</label>
                <textarea
                  value={priceChangeReason}
                  onChange={(e) => setPriceChangeReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  placeholder="Reason for price change..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handlePriceUpdate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Price
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Product Details</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Product Name</p>
                  <p className="font-semibold text-gray-900">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-gray-900">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900">{selectedProduct.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-green-600">{selectedProduct.status}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-900">{selectedProduct.description}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Delivery Requirements</p>
                <p className="text-gray-900">{selectedProduct.deliveryRequirements}</p>
              </div>

              <div className="border-t pt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Base Price</p>
                  <p className="text-xl font-bold text-gray-900">RM {selectedProduct.basePrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Your Price</p>
                  <p className="text-xl font-bold text-blue-600">RM {selectedProduct.yourPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Discount</p>
                  <p className="text-xl font-bold text-orange-600">{selectedProduct.maxDiscount}%</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3 font-medium">Attachments</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    onClick={(e) => { e.preventDefault(); alert('Download brochure for ' + selectedProduct.name); }}
                  >
                    <FileText size={16} />
                    Product Brochure (placeholder.pdf)
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                    onClick={(e) => { e.preventDefault(); alert('Download terms for ' + selectedProduct.name); }}
                  >
                    <FileText size={16} />
                    Terms & Conditions (placeholder.pdf)
                  </a>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => viewPriceHistory(selectedProduct)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Price History
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setEditingProduct(selectedProduct);
                    setNewPrice(selectedProduct.yourPrice.toString());
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300"
                >
                  Edit Price
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price Change Confirmation Modal */}
      {showConfirmation && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Price Change</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to change the price for <span className="font-semibold">{editingProduct.name}</span> from{' '}
              <span className="font-semibold text-red-600">RM {editingProduct.yourPrice}</span> to{' '}
              <span className="font-semibold text-green-600">RM {newPrice}</span>, effective{' '}
              <span className="font-semibold">{new Date(effectiveDate).toLocaleDateString()}</span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={confirmPriceChange}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Price History Modal */}
      {showPriceHistory && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full m-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Price History - {selectedProduct.name}</h3>
              <button onClick={() => setShowPriceHistory(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {priceHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No price history available</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date Changed</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Old Price</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">New Price</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Effective Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {priceHistory.map((history) => (
                      <tr key={history.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(history.changedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-red-600 font-semibold">
                          RM {history.oldPrice}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">
                          RM {history.newPrice}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(history.effectiveDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {history.reason || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
