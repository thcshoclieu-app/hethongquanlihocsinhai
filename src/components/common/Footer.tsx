export default function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 dark:text-slate-400">
      <p>&copy; {new Date().getFullYear()} Student Management System. All rights reserved.</p>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
      </div>
    </footer>
  );
}
