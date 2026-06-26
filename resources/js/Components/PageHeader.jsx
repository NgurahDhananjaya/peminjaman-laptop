export default function PageHeader() {
    return (
        <header className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Laptop Loan Management
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                An office has several laptops available for employees to borrow.
                You are tasked with creating a simple application to record laptop
                data and loan transactions.
            </p>
        </header>
    );
}
