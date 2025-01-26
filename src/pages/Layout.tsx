import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen  bg-gradient-to-r from-zinc-100 to-zinc-400">
      <header className="border-b">
        <nav className="container mx-auto p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/history" className="text-primary hover:underline">
                History
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
