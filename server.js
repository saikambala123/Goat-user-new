<!DOCTYPE html>
<html lang="en" class="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>LivestockMart - Admin App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    animation: {
                        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
                        'bounce-subtle': 'bounceSubtle 2s infinite',
                        'toast-slide': 'toastSlide 0.3s ease-out forwards',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(10px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        slideInRight: {
                            '0%': { opacity: '0', transform: 'translateX(20px)' },
                            '100%': { opacity: '1', transform: 'translateX(0)' },
                        },
                        bounceSubtle: {
                            '0%, 100%': { transform: 'translateY(-3%)' },
                            '50%': { transform: 'translateY(0)' },
                        },
                        toastSlide: {
                            '0%': { opacity: '0', transform: 'translateX(100%)' },
                            '100%': { opacity: '1', transform: 'translateX(0)' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; transition: background-color 0.3s, color 0.3s; overscroll-behavior-y: contain; }
        .modal { display: none; position: fixed; z-index: 50; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center; backdrop-filter: blur(4px); }
        .modal-content { padding: 24px; border-radius: 16px; width: 95%; max-width: 500px; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; animation: fadeInUp 0.3s ease-out; }
        .modal-scroll { overflow-y: auto; padding-right: 8px; }
        .modal-scroll::-webkit-scrollbar { width: 6px; }
        .modal-scroll::-webkit-scrollbar-track { border-radius: 10px; background-color: #f1f1f1; }
        .dark .modal-scroll::-webkit-scrollbar-track { background-color: #1f2937; }
        .modal-scroll::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #c0c0c0; }
        .dark .modal-scroll::-webkit-scrollbar-thumb { background-color: #6b7280; }
        #sidebar { transition: transform 0.3s ease-in-out; }
        .lucide { transition: transform 0.2s ease; }
        button:hover .lucide, .group:hover .lucide { transform: scale(1.1) rotate(5deg); }
        #pull-to-refresh { position: absolute; top: -50px; left: 0; width: 100%; height: 50px; display: flex; justify-content: center; align-items: center; z-index: 40; transition: top 0.2s; }
    </style>
</head>
<body class="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 h-screen flex overflow-hidden transition-colors">

    <div id="toast-container" class="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none"></div>

    <div id="mobile-overlay" onclick="toggleSidebar()" class="fixed inset-0 bg-black/50 z-20 hidden md:hidden backdrop-blur-sm transition-opacity"></div>

    <aside id="sidebar" class="fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transform -translate-x-full md:translate-x-0 md:relative transition-transform duration-200 ease-in-out shadow-xl md:shadow-none">
        <div class="p-6 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-green-600/30">L</div>
                <div>
                    <span class="block text-lg font-bold text-gray-800 dark:text-gray-100 leading-none">LivestockMart</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">Admin Panel</span>
                </div>
            </div>
            <button onclick="toggleSidebar()" class="md:hidden text-gray-500 hover:text-red-500 transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </div>

        <nav class="flex-1 px-4 space-y-2 mt-4 overflow-y-auto pb-24">
            <button onclick="adminRouter('dashboard')" class="admin-nav-item w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 rounded-xl transition-all duration-200 group">
                <i data-lucide="bar-chart-2" class="w-5 h-5"></i> Dashboard
            </button>
            <button onclick="adminRouter('livestock')" class="admin-nav-item w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 rounded-xl transition-all duration-200 group">
                <i data-lucide="package" class="w-5 h-5"></i> Livestock
            </button>
            <button onclick="adminRouter('orders')" class="admin-nav-item w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 rounded-xl transition-all duration-200 group">
                <i data-lucide="shopping-cart" class="w-5 h-5"></i> Orders
            </button>
            <button onclick="adminRouter('customers')" class="admin-nav-item w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 rounded-xl transition-all duration-200 group">
                <i data-lucide="users" class="w-5 h-5"></i> Customers
            </button>
            <button onclick="adminRouter('settings')" class="admin-nav-item w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 rounded-xl transition-all duration-200 group">
                <i data-lucide="settings" class="w-5 h-5"></i> Settings
            </button>
        </nav>

        <div class="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
            <button onclick="showToast('Logged Out Successfully', 'success')" class="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors group">
                <i data-lucide="log-out" class="w-5 h-5"></i> Logout
            </button>
        </div>
    </aside>

    <main class="flex-1 flex flex-col relative overflow-hidden w-full" id="main-content">
        <div id="pull-to-refresh">
            <i data-lucide="loader-2" class="w-6 h-6 text-green-600 animate-spin"></i>
        </div>

        <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4 flex justify-between items-center z-10 shadow-sm sticky top-0 backdrop-blur-md bg-white/90 dark:bg-gray-800/90">
            <div class="flex items-center gap-3">
                <button onclick="toggleSidebar()" class="md:hidden text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
                
                <div class="animate-fade-in-up">
                    <h1 id="admin-page-title" class="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
                    <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Manage your farm efficiently</p>
                </div>
            </div>

            <div class="flex items-center gap-4 md:gap-6">
                <div class="hidden md:flex items-center gap-3 border-l border-gray-300 dark:border-gray-600 pl-6">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">AU</div>
                    <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">Admin User</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
                    </div>
                </div>
                <button id="theme-toggle" class="relative text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i data-lucide="moon" class="w-6 h-6 hidden dark:block"></i>
                    <i data-lucide="sun" class="w-6 h-6 block dark:hidden"></i>
                </button>
                <button id="bell-btn" class="relative text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i data-lucide="bell" class="w-6 h-6"></i>
                    <span id="notification-badge" class="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center hidden shadow-sm ring-2 ring-white dark:ring-gray-800">0</span>
                </button>
            </div>
        </header>

        <div class="flex-1 overflow-y-auto p-4 md:p-8 relative pb-24 scroll-smooth" id="scrollable-content">
            <div id="admin-view-dashboard" class="space-y-6 hidden animate-fade-in-up">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <div class="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-500 rounded-2xl p-6 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div class="flex justify-between items-start relative z-10">
                            <div>
                                <p class="text-blue-100 font-medium">Total Livestock</p>
                                <h3 class="text-4xl font-bold text-white mt-2" id="stat-livestock">0</h3>
                            </div>
                            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <i data-lucide="package" class="w-6 h-6 text-white"></i>
                            </div>
                        </div>
                    </div>

                    <div class="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div class="flex justify-between items-start relative z-10">
                            <div>
                                <p class="text-emerald-100 font-medium">Total Orders</p>
                                <h3 class="text-4xl font-bold text-white mt-2" id="stat-orders">0</h3>
                            </div>
                            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <i data-lucide="shopping-cart" class="w-6 h-6 text-white"></i>
                            </div>
                        </div>
                    </div>

                    <div onclick="openDeliveredOrdersModal()" class="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div class="flex justify-between items-start relative z-10">
                            <div>
                                <p class="text-orange-100 font-medium">Delivered Revenue</p>
                                <h3 class="text-4xl font-bold text-white mt-2" id="stat-revenue">₹0</h3>
                            </div>
                            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <i data-lucide="wallet" class="w-6 h-6 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <h3 class="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <i data-lucide="pie-chart" class="w-5 h-5 text-gray-500"></i> Inventory Breakdown
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div class="flex items-center justify-between relative z-10">
                                <div>
                                    <p class="text-cyan-50 font-medium mb-1">Total Goats</p>
                                    <h2 id="stat-goats" class="text-4xl font-bold text-white">0</h2>
                                </div>
                                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
                                    <span class="text-2xl">🐐</span>
                                </div>
                            </div>
                        </div>

                        <div class="relative overflow-hidden bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-2xl p-6 shadow-lg shadow-fuchsia-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div class="flex items-center justify-between relative z-10">
                                <div>
                                    <p class="text-fuchsia-50 font-medium mb-1">Total Sheep</p>
                                    <h2 id="stat-sheep" class="text-4xl font-bold text-white">0</h2>
                                </div>
                                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
                                    <span class="text-2xl">🐑</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="admin-view-livestock" class="hidden space-y-6 animate-fade-in-up">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">All Livestock</h2>
                    <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div class="relative w-full md:w-auto">
                            <input type="text" id="livestock-search-input" oninput="searchLivestock()" placeholder="Search..." class="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition duration-150 shadow-sm">
                            <i data-lucide="search" class="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                        </div>
                        <button onclick="openLivestockModal()" class="w-full sm:w-auto flex justify-center items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-95 group">
                            <i data-lucide="plus" class="w-4 h-4"></i> Add New
                        </button>
                    </div>
                </div>
                <div id="livestock-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </div>

            <div id="admin-view-orders" class="hidden space-y-6 animate-fade-in-up">
                 <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">All Orders</h2>
                    <div class="relative w-full md:w-auto">
                        <input type="text" id="order-search-input" oninput="searchOrders()" placeholder="Search by name or ID..." class="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition duration-150 shadow-sm">
                        <i data-lucide="search" class="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left whitespace-nowrap">
                            <thead class="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                <tr>
                                    <th class="px-6 py-4">ID</th>
                                    <th class="px-6 py-4">Customer</th>
                                    <th class="px-6 py-4">Amount</th>
                                    <th class="px-6 py-4">Status</th>
                                    <th class="px-6 py-4 text-center">Proof</th>
                                    <th class="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody id="orders-table-body" class="divide-y divide-gray-100 dark:divide-gray-700 text-sm"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="admin-view-customers" class="hidden space-y-6 animate-fade-in-up">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">All Customers</h2>
                    <div class="relative w-full md:w-auto">
                        <input type="text" id="customer-search-input" oninput="searchCustomers()" placeholder="Search by name..." class="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition duration-150 shadow-sm">
                        <i data-lucide="search" class="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left whitespace-nowrap">
                            <thead class="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                <tr>
                                    <th class="px-6 py-4">Name</th>
                                    <th class="px-6 py-4">Email</th>
                                    <th class="px-6 py-4">Role</th>
                                    <th class="px-6 py-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody id="customers-table-body" class="divide-y divide-gray-100 dark:divide-gray-700 text-sm"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="admin-view-settings" class="hidden space-y-6 animate-fade-in-up">
                <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                     <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <i data-lucide="settings" class="w-8 h-8 text-green-600 dark:text-green-400"></i>
                            </div>
                            <h3 class="font-bold text-2xl text-gray-800 dark:text-gray-100">Settings</h3>
                        </div>
                    </div>
                    
                    <div class="space-y-8 border-b border-gray-100 dark:border-gray-700 pb-8">
                        <div class="flex justify-between items-center group">
                            <div class="flex items-center gap-4">
                                <div class="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition">
                                    <i data-lucide="sun-moon" class="w-6 h-6 text-blue-600 dark:text-blue-400"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800 dark:text-gray-100">Appearance</h4>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Toggle between Light and Dark mode.</p>
                                </div>
                            </div>
                            <button onclick="setTheme(htmlEl.classList.contains('dark') ? 'light' : 'dark')" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                                Toggle Theme
                            </button>
                        </div>

                        <div class="flex justify-between items-center group">
                            <div class="flex items-center gap-4">
                                <div class="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg group-hover:bg-yellow-100 dark:group-hover:bg-yellow-800/40 transition">
                                    <i data-lucide="wallet" class="w-6 h-6 text-yellow-600 dark:text-yellow-400"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800 dark:text-gray-100">Total Revenue</h4>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Delivered orders income.</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-1">
                                <span id="settings-revenue" class="text-2xl font-bold text-green-600 dark:text-green-400">₹0</span>
                                <button onclick="openDeliveredOrdersModal()" class="text-xs text-blue-600 hover:text-blue-800 hover:underline">View Details</button>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="font-bold text-lg flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                <i data-lucide="bell" class="w-5 h-5 text-gray-500"></i> Recent Notifications
                            </h3>
                            <button onclick="openNotificationModal()" class="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                                View All
                            </button>
                        </div>
                        <div id="settings-notification-preview" class="space-y-3 max-h-64 overflow-y-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <div id="livestock-modal" class="modal">
        <div class="modal-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
            <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2">Add New Livestock</h3>
            <img id="preview-image" src="" class="w-full h-40 object-cover rounded-xl mb-4 hidden shadow-md">
            <div class="modal-scroll flex-1 pr-2">
                <form onsubmit="event.preventDefault();">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Name</label>
                            <input id="new-name" type="text" required class="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Type</label>
                            <select id="new-type" required class="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none transition">
                                <option value="">Select Type</option>
                                <option value="Goat">Goat</option>
                                <option value="Sheep">Sheep</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Breed</label>
                            <input id="new-breed" type="text" required class="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none transition">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Weight (kg)</label>
                                <input id="new-weight" type="number" required class="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="25">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Price (INR)</label>
                                <input id="new-price" type="number" required class="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="25000">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Status</label>
                            <select id="new-status" required class="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none transition">
                                <option value="Available">Available</option>
                                <option value="Sold">Sold</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Tags</label>
                            <input id="new-tags" type="text" class="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none transition" placeholder="New, Premium...">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Image</label>
                            <input id="new-image" type="file" accept="image/*" onchange="previewImage(this)" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer">
                        </div>
                    </div>
                </form>
            </div>
            <div class="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button type="button" onclick="closeLivestockModal()" class="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors">Cancel</button>
                <button id="save-livestock-btn" type="button" class="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium shadow-lg shadow-green-600/30 transition-all hover:scale-105">Add</button>
            </div>
        </div>
    </div>

    <div id="delivered-orders-modal" class="modal">
        <div class="modal-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 !w-11/12 max-w-2xl shadow-2xl">
            <h3 class="text-xl font-bold mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                <i data-lucide="check-circle" class="w-6 h-6"></i> Delivered Orders Revenue
            </h3>
            <div id="delivered-orders-list" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
            <div class="mt-6 flex justify-end">
                <button type="button" onclick="closeDeliveredOrdersModal()" class="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors">Close</button>
            </div>
        </div>
    </div>
    
    <div id="notification-modal" class="modal">
        <div class="modal-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 !w-11/12 max-w-md shadow-2xl">
            <div class="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <i data-lucide="bell-ring" class="w-5 h-5 text-blue-500"></i> Notifications
                </h3>
                <button onclick="clearAllNotifications()" class="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wide">
                    Clear All
                </button>
            </div>
            <div id="notification-list" class="space-y-3 max-h-[60vh] overflow-y-auto pr-2"></div>
            <div class="mt-6 flex justify-end">
                <button onclick="closeNotificationModal()" class="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors">Close</button>
            </div>
        </div>
    </div>

    <div id="order-details-modal" class="modal">
        <div class="modal-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 !w-11/12 max-w-4xl max-h-[90vh] shadow-2xl">
            <h3 class="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2 sticky top-0 bg-white dark:bg-gray-800 z-10 py-2 border-b border-gray-100 dark:border-gray-700">
                <i data-lucide="file-text" class="w-6 h-6"></i> Order Details
            </h3>
            <div id="order-details-content" class="modal-scroll space-y-6 flex-1 py-2"></div>
            <div class="mt-4 flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 z-10">
                <button type="button" onclick="closeOrderDetailsModal()" class="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors">Close</button>
            </div>
        </div>
    </div>
    
    <div id="proof-modal" class="modal">
        <div class="modal-content bg-white dark:bg-gray-800 !w-11/12 max-w-xl">
             <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">Payment Proof</h3>
                <button onclick="document.getElementById('proof-modal').style.display='none'" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><i data-lucide="x" class="w-6 h-6"></i></button>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex items-center justify-center overflow-hidden">
                <img id="proof-image-el" src="" alt="Proof" class="max-w-full max-h-[70vh] object-contain rounded-lg">
            </div>
        </div>
    </div>

    <div id="reject-modal" class="modal">
        <div class="modal-content bg-white dark:bg-gray-800 !w-11/12 max-w-md">
            <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Reject Payment</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Please provide a reason for rejecting this payment. The user will be notified.</p>
            <textarea id="reject-reason" rows="3" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 outline-none" placeholder="E.g., Invalid screenshot, blurred image..."></textarea>
            <div class="mt-6 flex justify-end gap-3">
                <button onclick="document.getElementById('reject-modal').style.display='none'" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium">Cancel</button>
                <button onclick="confirmReject()" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg shadow-red-500/30">Reject Order</button>
            </div>
        </div>
    </div>

    <script>
        let livestock = [];
        let orders = [];
        let customers = [];
        let lastViewedRoute = localStorage.getItem('lastViewedRoute') || 'dashboard';
        let rejectOrderId = null;
        
        const API_URL = 'https://goat-user-new.vercel.app/api';
        
        let notifications = [];

        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            let bgClass = 'bg-gray-800 dark:bg-white text-white dark:text-gray-900';
            let icon = 'info';
            
            if (type === 'success') { bgClass = 'bg-green-600 text-white'; icon = 'check-circle'; } 
            else if (type === 'error') { bgClass = 'bg-red-600 text-white'; icon = 'alert-triangle'; } 
            else if (type === 'warning') { bgClass = 'bg-yellow-500 text-white'; icon = 'alert-circle'; }

            toast.className = `${bgClass} px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-toast-slide min-w-[300px] pointer-events-auto`;
            toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i><span class="font-medium text-sm">${message}</span>`;
            container.appendChild(toast);
            lucide.createIcons();

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        let touchStartY = 0;
        let touchMoveY = 0;
        const mainContent = document.getElementById('scrollable-content');
        const spinner = document.getElementById('pull-to-refresh');

        mainContent.addEventListener('touchstart', (e) => { if (mainContent.scrollTop === 0) touchStartY = e.touches[0].clientY; }, { passive: true });
        mainContent.addEventListener('touchmove', (e) => {
            if (mainContent.scrollTop === 0) {
                touchMoveY = e.touches[0].clientY;
                const diff = touchMoveY - touchStartY;
                if (diff > 0 && diff < 150) spinner.style.top = `${diff/2 - 25}px`;
            }
        }, { passive: true });
        mainContent.addEventListener('touchend', async () => {
            if (mainContent.scrollTop === 0 && (touchMoveY - touchStartY) > 80) {
                spinner.style.top = '20px';
                await loadData(lastViewedRoute);
                setTimeout(() => { spinner.style.top = '-50px'; }, 500);
            } else { spinner.style.top = '-50px'; }
            touchStartY = 0; touchMoveY = 0;
        });

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            if (sidebar.classList.contains('-translate-x-full')) { sidebar.classList.remove('-translate-x-full'); overlay.classList.remove('hidden'); } 
            else { sidebar.classList.add('-translate-x-full'); overlay.classList.add('hidden'); }
        }

        const htmlEl = document.documentElement;
        const themeToggleBtn = document.getElementById('theme-toggle');
        function setTheme(theme) {
            if (theme === 'dark') { htmlEl.classList.add('dark'); localStorage.setItem('theme', 'dark'); } 
            else { htmlEl.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
            lucide.createIcons();
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) setTheme(savedTheme); else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark'); else setTheme('light');
        if (themeToggleBtn) themeToggleBtn.addEventListener('click', () => setTheme(htmlEl.classList.contains('dark') ? 'light' : 'dark'));

        function formatINR(amount) {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
        }

        function previewImage(input) {
            const preview = document.getElementById('preview-image');
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = e => { preview.src = e.target.result; preview.classList.remove('hidden'); preview.classList.add('block', 'animate-fade-in-up'); }
                reader.readAsDataURL(input.files[0]);
            }
        }

        function openLivestockModal(isEdit = false, id = null) {
            let item = null;
            if (isEdit && id) { item = livestock.find(i => i._id === id); if (!item) return; }
            const modal = document.getElementById('livestock-modal');
            const title = document.querySelector('#livestock-modal h3');
            const btn = document.getElementById('save-livestock-btn');
            const preview = document.getElementById('preview-image');

            title.innerText = isEdit ? 'Edit Livestock' : 'Add New Livestock';
            btn.innerText = isEdit ? 'Update' : 'Add';
            btn.onclick = () => saveLivestock(isEdit, id);

            if (isEdit && item) {
                document.getElementById('new-name').value = item.name;
                document.getElementById('new-type').value = item.type;
                document.getElementById('new-breed').value = item.breed;
                let w = item.weight || item.age || '';
                if(w && w.toString().toLowerCase().includes('kg')) w = w.replace(/kg/gi, '').trim();
                document.getElementById('new-weight').value = w;
                document.getElementById('new-price').value = item.price;
                document.getElementById('new-status').value = item.status;
                document.getElementById('new-tags').value = item.tags || '';
                preview.src = `${API_URL}/livestock/image/${item._id}`;
                preview.classList.remove('hidden'); preview.classList.add('block');
            } else {
                document.querySelector('#livestock-modal form').reset();
                preview.classList.add('hidden'); preview.classList.remove('block');
            }
            modal.style.display = 'flex';
        }

        function closeLivestockModal() { document.getElementById('livestock-modal').style.display = 'none'; }
        
        function openDeliveredOrdersModal() { renderDeliveredOrders(); document.getElementById('delivered-orders-modal').style.display = 'flex'; lucide.createIcons(); }
        function closeDeliveredOrdersModal() { document.getElementById('delivered-orders-modal').style.display = 'none'; }

        function openOrderDetailsModal(id) {
            const order = orders.find(o => o._id === id); if (!order) return;
            const content = document.getElementById('order-details-content');
            document.getElementById('order-details-modal').style.display = 'flex';

            let itemsHTML = '';
            for (const item of order.items || []) {
                const fullItem = livestock.find(l => l._id === item._id) || item;
                let displayWeight = (fullItem.weight || fullItem.age || 'N/A').toString().replace('kg','').trim() + ' kg';
                itemsHTML += `
                    <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600 flex flex-col sm:flex-row gap-4 animate-slide-in-right hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div class="w-full sm:w-28 h-28 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden shadow-sm group">
                            <img src="${API_URL}/livestock/image/${item._id}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://via.placeholder.com/150?text=No+Image';">
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-lg text-gray-800 dark:text-gray-100">${fullItem.name || 'Unknown'}</h4>
                            <div class="grid grid-cols-2 gap-y-1 mt-2 text-sm text-gray-600 dark:text-gray-300">
                                <p><span class="font-medium">Type:</span> ${fullItem.type || 'N/A'}</p>
                                <p><span class="font-medium">Breed:</span> ${fullItem.breed || 'N/A'}</p>
                                <p><span class="font-medium">Weight:</span> ${displayWeight}</p>
                            </div>
                            <p class="text-xl font-bold text-green-600 dark:text-green-400 mt-3">${formatINR(fullItem.price || item.price)}</p>
                        </div>
                    </div>`;
            }

            content.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl">
                    <div class="space-y-3">
                        <div><p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Order ID</p><p class="font-bold text-gray-800 dark:text-gray-100 break-all">#${order._id}</p></div>
                        <div><p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Date</p><p class="font-medium text-gray-800 dark:text-gray-100">${new Date(order.date).toLocaleString()}</p></div>
                        <div><p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Customer</p><p class="font-medium text-gray-800 dark:text-gray-100">${order.customer}</p></div>
                        <div><p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Status</p>
                            <span class="inline-flex items-center gap-1.5 py-1 px-3 mt-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}">${order.status}</span>
                        </div>
                        ${order.status === 'Payment Rejected' ? `<div><p class="text-xs text-red-500 uppercase font-semibold">Rejection Reason</p><p class="font-bold text-red-600">${order.rejectionReason || 'N/A'}</p></div>` : ''}
                    </div>
                    <div class="space-y-3">
                        <div><p class="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Shipping Address</p>
                            <p class="font-medium text-gray-800 dark:text-gray-100">${order.address?.name || 'N/A'}, ${order.address?.phone || ''}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">${order.address?.line1 || ''}, ${order.address?.city || ''}, ${order.address?.state || ''} - ${order.address?.pincode || ''}</p>
                        </div>
                        <div class="pt-4 border-t border-gray-200 dark:border-gray-600 mt-2">
                            <div class="flex justify-between text-lg font-bold"><span>Total Amount</span><span class="text-green-600 dark:text-green-400">${formatINR(order.total)}</span></div>
                        </div>
                    </div>
                </div>
                <div class="mt-8"><h4 class="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2"><i data-lucide="package" class="w-5 h-5 text-gray-500"></i> Ordered Items</h4><div class="space-y-4">${itemsHTML || '<p class="text-gray-500 text-center py-4">No items found.</p>'}</div></div>
            `;
            lucide.createIcons();
        }

        function closeOrderDetailsModal() { document.getElementById('order-details-modal').style.display = 'none'; }
        
        function viewProof(id) {
            document.getElementById('proof-image-el').src = `${API_URL}/admin/orders/proof/${id}`;
            document.getElementById('proof-modal').style.display = 'flex';
            lucide.createIcons();
        }

        function openRejectModal(id) {
            rejectOrderId = id;
            document.getElementById('reject-reason').value = '';
            document.getElementById('reject-modal').style.display = 'flex';
        }

        async function confirmReject() {
            if(!rejectOrderId) return;
            const reason = document.getElementById('reject-reason').value.trim();
            if(!reason) return showToast('Please enter a reason', 'warning');

            const btn = document.querySelector('#reject-modal button.bg-red-600');
            const originalText = btn.innerText;
            btn.innerText = 'Rejecting...';
            btn.disabled = true;

            try {
                const res = await fetch(`${API_URL}/admin/orders/${rejectOrderId}/reject`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reason })
                });
                if(!res.ok) throw new Error('Failed to reject');
                
                showToast('Order Rejected & User Notified', 'success');
                document.getElementById('reject-modal').style.display = 'none';
                await loadData(lastViewedRoute);
            } catch(e) {
                console.error(e);
                showToast('Error rejecting order', 'error');
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
                rejectOrderId = null;
            }
        }

        function getStatusColor(status) {
            const colors = {
                Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
                Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
                Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
                Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
                Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
                'Payment Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
            };
            return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
        }

        async function loadData(targetRoute = lastViewedRoute) {
            ['dashboard', 'livestock', 'orders', 'customers', 'settings'].forEach(v => document.getElementById(`admin-view-${v}`)?.classList.toggle('hidden', v !== targetRoute));
            const isPulling = document.getElementById('pull-to-refresh').style.top === '20px';
            const mainContainer = document.querySelector('main .flex-1.overflow-y-auto');
            if (mainContainer && !document.getElementById('loading-overlay') && !isPulling) {
                mainContainer.insertAdjacentHTML('afterbegin', `<div id="loading-overlay" class="absolute inset-0 bg-white/80 dark:bg-gray-900/90 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity"><div class="text-center animate-pulse"><i data-lucide="loader-2" class="w-12 h-12 text-green-600 dark:text-green-400 animate-spin mx-auto"></i><p class="mt-4 text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wide uppercase">Loading Data...</p></div></div>`);
                lucide.createIcons();
            }

            try {
                const [livestockRes, ordersRes, usersRes] = await Promise.all([
                    fetch(`${API_URL}/admin/livestock`).then(res => res.json()),
                    fetch(`${API_URL}/admin/orders`).then(res => res.json()),
                    fetch(`${API_URL}/admin/users`).then(res => res.json())
                ]);
                livestock = livestockRes.livestock || [];
                orders = ordersRes.orders || [];
                customers = usersRes.users || [];
                
                document.getElementById('stat-livestock').innerText = livestock.length;
                document.getElementById('stat-orders').innerText = orders.length;
                const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((sum, order) => sum + (order.total || 0), 0);
                document.getElementById('stat-revenue').innerText = formatINR(totalRevenue);
                document.getElementById('settings-revenue').innerText = formatINR(totalRevenue);
                if(document.getElementById('stat-goats')) document.getElementById('stat-goats').innerText = livestock.filter(l => l.type === 'Goat').length;
                if(document.getElementById('stat-sheep')) document.getElementById('stat-sheep').innerText = livestock.filter(l => l.type === 'Sheep').length;

                document.getElementById('loading-overlay')?.remove();
                adminRouter(targetRoute);
            } catch (error) {
                console.error("Error loading data:", error);
                document.getElementById('loading-overlay')?.remove();
                showToast("Failed to load data", "error");
                adminRouter(targetRoute);
            }
        }

        function renderLivestock(searchQuery = '') {
            const grid = document.getElementById('livestock-grid'); if (!grid) return;
            const query = searchQuery.toLowerCase().trim();
            const filteredLivestock = livestock.filter(item => query === '' || item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query) || item.breed.toLowerCase().includes(query));
            if (filteredLivestock.length === 0) { grid.innerHTML = '<div class="col-span-full flex flex-col items-center justify-center text-center p-12 text-gray-500 dark:text-gray-400"><i data-lucide="package-open" class="w-12 h-12 mb-4 opacity-50"></i><p>No matching livestock found.</p></div>'; lucide.createIcons(); return; }

            grid.innerHTML = filteredLivestock.map((item, index) => {
                let displayW = (item.weight || item.age || 'N/A').toString().replace('kg','').trim() + ' kg';
                return `
                <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style="animation-delay: ${index * 50}ms">
                    <div class="h-48 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative mb-4">
                        <img src="${API_URL}/livestock/image/${item._id}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onerror="this.src='https://via.placeholder.com/300?text=No+Image';">
                        <span class="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">${item.status}</span>
                    </div>
                    <div class="space-y-2 mb-4 px-1">
                         <div class="flex justify-between items-start"><h3 class="font-bold text-lg text-gray-900 dark:text-white truncate">${item.name}</h3></div>
                         <div class="grid grid-cols-2 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                             <p class="flex items-center gap-1"><i data-lucide="dna" class="w-3 h-3"></i> ${item.breed}</p>
                             <p class="flex items-center gap-1"><i data-lucide="tag" class="w-3 h-3"></i> ${item.type}</p>
                             <p class="flex items-center gap-1"><i data-lucide="scale" class="w-3 h-3"></i> ${displayW}</p>
                         </div>
                    </div>
                    <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span class="text-xl font-bold text-green-600 dark:text-green-400">${formatINR(item.price)}</span>
                        <div class="flex gap-2">
                            <button onclick="openLivestockModal(true, '${item._id}')" class="bg-blue-600 text-white p-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-sm"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                            <button onclick="removeItem('${item._id}')" class="bg-red-600 text-white p-2 rounded-lg text-sm hover:bg-red-700 transition shadow-sm"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                </div>`;
            }).join('');
            lucide.createIcons();
        }
        
        function renderOrders(searchQuery = '') {
            const tableBody = document.getElementById('orders-table-body'); if (!tableBody) return;
            const query = searchQuery.toLowerCase().trim();
            const filteredOrders = orders.filter(order => query === '' || order.customer.toLowerCase().includes(query) || order._id.slice(-6).toLowerCase().includes(query));

            if (filteredOrders.length === 0) { tableBody.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No matching orders found.</td></tr>'; return; }

            tableBody.innerHTML = filteredOrders.map((order, index) => {
                const hasProof = !!order.paymentProof;
                const canReject = order.status !== 'Delivered' && order.status !== 'Cancelled' && order.status !== 'Payment Rejected';
                const canNext = order.status !== 'Delivered' && order.status !== 'Cancelled' && order.status !== 'Payment Rejected';

                return `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors animate-fade-in-up" style="animation-delay: ${index * 50}ms">
                    <td class="px-6 py-4">
                        <span class="font-bold text-gray-800 dark:text-gray-100 font-mono">#${order._id.slice(-6)}</span><br>
                        <button onclick="openOrderDetailsModal('${order._id}')" class="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 font-medium">View Details</button>
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">${order.customer}</td>
                    <td class="px-6 py-4 font-bold text-green-600 dark:text-green-400">${formatINR(order.total)}</td>
                    <td class="px-6 py-4">
                        <span class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold shadow-sm ${getStatusColor(order.status)}">
                            <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>${order.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                        ${hasProof ? 
                        `<button onclick="viewProof('${order._id}')" class="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-lg transition" title="View Payment Proof">
                            <i data-lucide="image" class="w-5 h-5"></i>
                         </button>` : 
                         `<span class="text-xs text-gray-400">No Proof</span>`
                        }
                    </td>
                    <td class="px-6 py-4 text-right flex justify-end gap-2">
                        ${canReject ? 
                        `<button onclick="openRejectModal('${order._id}')" class="text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition text-xs font-bold border border-red-200 dark:border-red-800" title="Reject Payment">
                           Reject
                        </button>` : ''}
                        
                        <button onclick="nextStatus('${order._id}', '${order.status}')" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" ${!canNext ? 'disabled' : ''}>
                            ${order.status === 'Delivered' ? 'Completed' : order.status === 'Cancelled' ? 'Cancelled' : order.status === 'Payment Rejected' ? 'Rejected' : 'Next Step &rarr;'}
                        </button>
                    </td>
                </tr>
            `}).join('');
            lucide.createIcons();
        }

        function renderCustomers(searchQuery = '') {
            const tableBody = document.getElementById('customers-table-body'); if (!tableBody) return;
            const query = searchQuery.toLowerCase().trim();
            const filtered = customers.filter(u => query === '' || u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query));
            if (filtered.length === 0) { tableBody.innerHTML = '<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No matching customers found.</td></tr>'; return; }
            tableBody.innerHTML = filtered.map((user, index) => `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors animate-fade-in-up" style="animation-delay: ${index * 50}ms">
                    <td class="px-6 py-4 flex items-center gap-3">
                        <div class="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">${user.name.charAt(0).toUpperCase()}</div>
                        <span class="font-medium text-gray-800 dark:text-gray-100">${user.name}</span>
                    </td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">${user.email}</td>
                    <td class="px-6 py-4"><span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">Customer</span></td>
                    <td class="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">${new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
            `).join('');
            lucide.createIcons();
        }
        
        function renderDeliveredOrders() {
            const delivered = orders.filter(o => o.status === 'Delivered');
            const list = document.getElementById('delivered-orders-list');
            if (delivered.length === 0) { list.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400 p-8 border border-dashed dark:border-gray-600 rounded-lg">No successful deliveries found yet.</p>'; return; }
            const byCustomer = delivered.reduce((acc, o) => { const n = o.customer || 'Unknown'; if (!acc[n]) acc[n] = []; acc[n].push(o); return acc; }, {});
            let html = '';
            for (const name in byCustomer) {
                const total = byCustomer[name].reduce((sum, o) => sum + (o.total || 0), 0);
                html += `<div class="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-xl border border-gray-100 dark:border-gray-700"><div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600 mb-3"><h4 class="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2"><i data-lucide="user-check" class="w-4 h-4 text-green-500"></i> ${name}</h4><span class="text-lg font-bold text-green-600 dark:text-green-400">${formatINR(total)}</span></div><ul class="space-y-2">${byCustomer[name].map(o => `<li class="flex justify-between text-sm text-gray-600 dark:text-gray-300 py-1 hover:bg-white dark:hover:bg-gray-600 px-2 rounded transition-colors"><span class="font-mono text-gray-500">#${o._id.slice(-6)}</span><span class="text-xs text-gray-400">${new Date(o.date).toLocaleDateString()}</span><span class="font-medium text-gray-800 dark:text-gray-100">${formatINR(o.total)}</span></li>`).join('')}</ul></div>`;
            }
            list.innerHTML = html; lucide.createIcons();
        }

        function adminRouter(viewName) {
            lastViewedRoute = viewName; localStorage.setItem('lastViewedRoute', viewName);
            const titles = { dashboard: 'Dashboard', livestock: 'Livestock', orders: 'Orders', customers: 'Customers', settings: 'Settings' };
            document.getElementById('admin-page-title').innerText = titles[viewName];
            ['dashboard', 'livestock', 'orders', 'customers', 'settings'].forEach(v => document.getElementById(`admin-view-${v}`)?.classList.toggle('hidden', v !== viewName));
            
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            if (window.innerWidth < 768 && !sidebar.classList.contains('-translate-x-full')) { sidebar.classList.add('-translate-x-full'); overlay.classList.add('hidden'); }

            document.querySelectorAll('.admin-nav-item').forEach(btn => {
                if (btn.getAttribute('onclick')?.includes(viewName)) {
                     btn.classList.add('bg-green-600', 'text-white', 'shadow-lg', 'shadow-green-600/30');
                     btn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:bg-green-50', 'dark:hover:bg-green-900/30');
                } else {
                     btn.classList.remove('bg-green-600', 'text-white', 'shadow-lg', 'shadow-green-600/30');
                     btn.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:bg-green-50', 'dark:hover:bg-green-900/30');
                }
            });

            if (viewName === 'livestock') { document.getElementById('livestock-search-input').value = ''; renderLivestock(''); }
            if (viewName === 'orders') { document.getElementById('order-search-input').value = ''; renderOrders(''); }
            if (viewName === 'customers') { document.getElementById('customer-search-input').value = ''; renderCustomers(''); }
            if (viewName === 'settings') updateNotificationPreviews();
            lucide.createIcons();
        }
        
        function searchLivestock() { renderLivestock(document.getElementById('livestock-search-input').value); }
        function searchOrders() { renderOrders(document.getElementById('order-search-input').value); }
        function searchCustomers() { renderCustomers(document.getElementById('customer-search-input').value); }

        async function saveLivestock(isEdit, id) {
            const formData = new FormData();
            formData.append('name', document.getElementById('new-name').value);
            formData.append('type', document.getElementById('new-type').value);
            formData.append('breed', document.getElementById('new-breed').value);
            const w = document.getElementById('new-weight').value;
            formData.append('weight', w); formData.append('age', w + ' kg');
            formData.append('price', document.getElementById('new-price').value);
            formData.append('status', document.getElementById('new-status').value);
            formData.append('tags', document.getElementById('new-tags').value);
            if(document.getElementById('new-image').files[0]) formData.append('image', document.getElementById('new-image').files[0]);

            try {
                const res = await fetch(`${API_URL}/admin/livestock${isEdit ? '/' + id : ''}`, { method: isEdit ? 'PUT' : 'POST', body: formData });
                if (!res.ok) throw new Error('Failed');
                closeLivestockModal(); await loadData(lastViewedRoute); showToast(`Livestock ${isEdit ? 'updated' : 'added'}`, "success");
            } catch (e) { showToast('Error saving livestock', 'error'); }
        }

        async function removeItem(id) {
            if (!confirm("Permanently remove?")) return;
            try { await fetch(`${API_URL}/admin/livestock/${id}`, { method: 'DELETE' }); await loadData(lastViewedRoute); showToast("Removed", "success"); } catch (e) { showToast("Error", "error"); }
        }

        async function nextStatus(id, currentStatus) {
            let next = currentStatus === 'Pending' || currentStatus === 'Processing' ? 'Shipped' : currentStatus === 'Shipped' ? 'Delivered' : null;
            if (!next) return;
            try { await fetch(`${API_URL}/admin/orders/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ status: next }) }); await loadData(lastViewedRoute); showToast(`Updated to ${next}`, "success"); } catch (e) { showToast("Error", "error"); }
        }

        // --- ADMIN NOTIFICATIONS (Server Synced) ---
        async function fetchNotifications() {
            try {
                const res = await fetch(`${API_URL}/admin/notifications`);
                const data = await res.json();
                notifications = data.notifications || [];
                updateNotificationPreviews();
                updateBell();
            } catch (e) { console.error('Failed to fetch notifications', e); }
        }

        async function clearAllNotifications() { 
            try {
                await fetch(`${API_URL}/admin/notifications/clear`, { method: 'DELETE' });
                notifications = []; 
                updateNotificationPreviews(); 
                document.getElementById('notification-list').innerHTML = '<p class="text-center text-gray-500 py-8">No notifications</p>'; 
                updateBell();
            } catch(e) { showToast('Error clearing notifications', 'error'); }
        }

        function updateBell() { 
            const b = document.getElementById('notification-badge'); 
            const count = notifications.length; 
            b.innerText = count; 
            b.classList.toggle('hidden', count === 0); 
        }

        function updateNotificationPreviews() {
            const list = (container, isModal) => {
                if(!container) return;
                container.innerHTML = notifications.length ? (isModal ? notifications : notifications.slice(0, 5)).map((n, i) => `
                    <div class="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex justify-between items-start gap-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 ${n.type === 'error' || n.type === 'warning' ? 'border-red-500' : 'border-green-500'}">
                        <div class="flex-1">
                            <p class="font-medium text-sm text-gray-800 dark:text-gray-200">${n.message}</p>
                            <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">${new Date(n.createdAt).toLocaleString()}</p>
                        </div>
                    </div>`).join('') : `<p class="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">No notifications</p>`;
                lucide.createIcons();
            };
            list(document.getElementById('settings-notification-preview'), false);
            list(document.getElementById('notification-list'), true);
        }

        function openNotificationModal() { 
            document.getElementById('notification-modal').style.display = 'flex'; 
            fetchNotifications(); // Refresh on open
        }
        
        function closeNotificationModal() { document.getElementById('notification-modal').style.display = 'none'; }
        document.getElementById('bell-btn').onclick = openNotificationModal;

        // Poll for notifications and new orders every 10 seconds
        setInterval(() => {
            fetchNotifications();
        }, 10000);

        document.addEventListener('DOMContentLoaded', () => {
            const init = localStorage.getItem('lastViewedRoute') || 'dashboard';
            document.getElementById(`admin-view-${init}`)?.classList.remove('hidden');
            loadData(init);
            fetchNotifications();
        });
    </script>
</body>
</html>
