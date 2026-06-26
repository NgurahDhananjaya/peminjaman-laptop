import AppTabs from '@/Components/AppTabs';
import PageHeader from '@/Components/PageHeader';

export default function AppLayout({ activeTab, children }) {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-6xl">
                <PageHeader />
                <AppTabs activeTab={activeTab} />
                <section className="mt-8">{children}</section>
            </div>
        </main>
    );
}
