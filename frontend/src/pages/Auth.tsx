
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Auth() {
  const location = useLocation();
  const isRegister = location.pathname === "/auth/register";

  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden md:flex flex-1 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70 z-0"></div>
        <div className="relative z-10 max-w-lg px-8 py-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Marketing Analytics Platform</h1>
          <p className="text-white/90 mb-6">
            Data-driven insights to power your marketing strategies and drive business growth.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-medium mb-1">Real-time Dashboards</h3>
              <p className="text-white/80 text-sm">
                Monitor campaign performance with live metrics and actionable insights.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-medium mb-1">AI-Powered Insights</h3>
              <p className="text-white/80 text-sm">
                Leverage machine learning to predict trends and optimize results.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-medium mb-1">Campaign Management</h3>
              <p className="text-white/80 text-sm">
                Create, track and analyze all your marketing initiatives in one place.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-medium mb-1">Customer Segmentation</h3>
              <p className="text-white/80 text-sm">
                Target the right audience with powerful segmentation tools.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
