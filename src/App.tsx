import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import One from "./pages/1";
import Three from "./pages/3";
import Two from "./pages/2";
import GeneralLayout from "./layouts/GeneralLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/one"
            element={
              <GeneralLayout>
                <One />
              </GeneralLayout>
            }
          />
          <Route
            path="/two"
            element={
              <GeneralLayout>
                <Two />
              </GeneralLayout>
            }
          />
          <Route
            path="/three"
            element={
              <GeneralLayout>
                <Three children={<></>} />
              </GeneralLayout>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
