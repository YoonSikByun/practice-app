import '@/app/globals.css';

function App ({ children }: { children: React.ReactNode }) {
    return (
      <div>
        {children}
      </div>
    );
}

export default App