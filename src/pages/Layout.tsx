import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-zinc-100 to-zinc-400">
        {/* Header */}
        <header className="flex justify-between items-center border-b bg-white p-4">
          <img
            src="https://qibb.com/wp-content/uploads/hyve-logo-1920x884.png"
            alt="Hyve Logo"
            className="h-12 w-auto md:h-16"
          />
          <nav className="flex-1 flex justify-end">
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

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              Developed by{" "}
              <a
                href="https://www.walbermelo.com/"
                className="text-white font-bold"
              >
                W|M 🟣
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
