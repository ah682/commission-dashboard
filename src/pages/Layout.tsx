import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar  from "../components/Navbar";

export function Layout() {
return (
<div className="flex flex-col min-h-screen">
    <Navbar/>
    <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={
        <div className="flex juistify-center items-center h-96">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        }>

    <Outlet/>
    </Suspense>
</main>
</div>
);
}