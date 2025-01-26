import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen  bg-gradient-to-r from-zinc-100 to-zinc-400">
      <header className="flex justify-end items-center border-b bg-white p-4">
        <img
          src="https://qibb.com/wp-content/uploads/hyve-logo-1920x884.png"
          alt="Hyve Logo"
          className="h-12 w-auto md:h-16"
        ></img>
        <nav className="flex-1 flex justify-end ">
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
