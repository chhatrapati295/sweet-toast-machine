import { useRef, useState, useEffect } from "react";
import Toast from "./Toast";

export interface IToast {
  id: number;
  type: "Success" | "Danger" | "Info" | string;
  content: string;
}

function App() {
  // State to store all toast items
  const [toastItems, setToastItems] = useState<IToast[]>([]);

  // Ref to store timeout IDs for clearing them later
  const intervalRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const handleShowToast = (type: string, content: string) => {
    // Generate unique ID
    let id = new Date().getTime();
    // Add toast to state
    setToastItems((prevToast) => [...prevToast, { id, type, content }]);
    // Auto-close the toast after 3 seconds
    intervalRef.current[id] = setTimeout(() => {
      handleCloseToast(id);
    }, 3000);
  };

  // Handle closing a toast manually or after timeout
  const handleCloseToast = (id: number) => {
    clearTimeout(intervalRef.current[id]); // Clear the timeout
    delete intervalRef.current[id]; // Clean up from ref

    // Remove toast from state
    setToastItems((prevItems) => {
      let filteredData = prevItems.filter((item) => item.id !== id);
      return [...filteredData];
    });
  };

  // Cleanup all timeouts on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      Object.values(intervalRef.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Toast Display Area */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {toastItems.map((item: IToast) => (
          <Toast key={item.id} data={item} handleClose={handleCloseToast} />
        ))}
      </div>

      {/* Buttons to trigger toasts */}
      <div className="flex items-center gap-1 text-xs">
        <button
          className="border rounded-md p-2 w-fit border-black"
          onClick={() => {
            handleShowToast("Success", "Your toast was successful!");
          }}
        >
          Show success
        </button>
        <button
          className="border rounded-md p-2 w-fit border-black"
          onClick={() => {
            handleShowToast("Danger", "There was an error!");
          }}
        >
          Show danger
        </button>
        <button
          className="border rounded-md p-2 w-fit border-black"
          onClick={() => {
            handleShowToast("Info", "Here is some information.");
          }}
        >
          Show info
        </button>
      </div>
    </div>
  );
}

export default App;

/*

APPROCHABLE STEPS --------->

1. FIRST WE CREATE BUTTON AND THEN A ARRAY STATE FOR ALL TOAST ITEMS.
2. MAKE UI FOR TOAST & THEN START ADDING TOAST ON BUTTON CLICK.
3. NOW MAKE CLOSE TOAST FUNC FOR PARTICULAR TOAST ON THE BASE OF ID.
4. NOW AUTOMATE TOAST CLOSURE ( USE REF FOR BETTER TOAST HANDLING ).
5. AFTER CLOSING TOASTS CLEAN UP ALL THE INTERVALS.

*/
