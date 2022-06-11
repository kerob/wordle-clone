import Navbar from "./components/Navbar";
import NotificationProvider from "./components/Notifications/NotificationProvider";
import Input from "./Input";

function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <Navbar />

        <Input />
      </NotificationProvider>
    </div>
  );
}

export default App;
