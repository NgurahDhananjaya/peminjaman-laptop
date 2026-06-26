import { Link } from '@inertiajs/react';

export default function AppTabs({ activeTab }) {
    const tabs = [
        { key: 'laptop', label: 'Laptops', href: route('laptop.index') },
        { key: 'peminjaman', label: 'Loans', href: route('peminjaman.index') },
    ];

    return (
        <nav className="mt-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <Link
                            key={tab.key}
                            href={tab.href}
                            className={[
                                'rounded-lg px-8 py-2 text-sm font-semibold transition',
                                isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                            ].join(' ')}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
