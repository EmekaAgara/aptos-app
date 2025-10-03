// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// // Internal Components
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Header } from "@/components/Header";
// import { WalletDetails } from "@/components/WalletDetails";
// import { NetworkInfo } from "@/components/NetworkInfo";
// import { AccountInfo } from "@/components/AccountInfo";
// import { TransferAPT } from "@/components/TransferAPT";
// import { MessageBoard } from "@/components/MessageBoard";
// import { TopBanner } from "@/components/TopBanner";

// function App() {
//   const { connected } = useWallet();

//   return (
//     <>
//       <TopBanner />
//       <Header />
//       <div className="flex items-center justify-center flex-col">
//         {connected ? (
//           <Card>
//             <CardContent className="flex flex-col gap-10 pt-6">
//               <WalletDetails />
//               <NetworkInfo />
//               <AccountInfo />
//               <TransferAPT />
//               <MessageBoard />
//             </CardContent>
//           </Card>
//         ) : (
//           <CardHeader>
//             <CardTitle>To get started Connect a wallet</CardTitle>
//           </CardHeader>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import Dashboard from "@/pages/Dashboard";
import Wallet from "@/pages/Wallet";
import Remittance from "@/pages/Remittance";
import Analytics from "@/pages/Analytics";
import Lending from "@/pages/Lending";
import Trading from "@/pages/Trading";
import PaymentLink from "@/pages/PaymentLink";
import Swap from "@/pages/Swap";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* <Header /> */}
          <Navigation />
          <main className="container mx-auto px-4 py-8 pb-20 md:pb-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/remittance" element={<Remittance />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/lending" element={<Lending />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/pay/:walletAddress" element={<PaymentLink />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
