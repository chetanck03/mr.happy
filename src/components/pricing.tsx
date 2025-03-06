
"use client"

import { motion } from "framer-motion";
import { ActionButton } from "./action-button";
import { useState } from "react";

interface PricingPlan {
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
}

export function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    
    const pricingPlans: PricingPlan[] = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for getting started",
            features: [
                "Basic AI conversations",
                "5 requests per day",
                "Standard response time",
                "Community support"
            ]
        },
        {
            name: "Pro",
            price: billingPeriod === 'monthly' ? "$19" : "$190",
            description: "Best for professionals",
            features: [
                "Everything in Free",
                "Unlimited conversations",
                "Priority response time",
                "Custom assistant training",
                "Email support"
            ],
            isPopular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For organizations with complex needs",
            features: [
                "Everything in Pro",
                "Dedicated server resources",
                "Custom integrations",
                "Advanced analytics",
                "24/7 priority support",
                "SLA guarantees"
            ]
        }
    ];

    return (
        <section className="py-20 md:py-24" id="pricing">
            <div className="container">
                <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
                    Simple, transparent pricing
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
                    Choose the plan that works best for your needs
                </p>
                
                <div className="flex justify-center mt-8 mb-12">
                    <div className="flex items-center p-1 bg-black/20 border border-white/10 rounded-full">
                        <button 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingPeriod === 'monthly' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
                            onClick={() => setBillingPeriod('monthly')}
                        >
                            Monthly
                        </button>
                        <button 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingPeriod === 'yearly' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
                            onClick={() => setBillingPeriod('yearly')}
                        >
                            Yearly <span className="text-xs opacity-80">Save 20%</span>
                        </button>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    {pricingPlans.map((plan, index) => (
                        <motion.div 
                            key={plan.name}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl border ${plan.isPopular ? 'border-purple-500' : 'border-white/10'} p-6 flex flex-col`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-semibold">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.price !== "Custom" && <span className="text-white/60 ml-2">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>}
                            </div>
                            <p className="mt-2 text-white/60">{plan.description}</p>
                            
                            <ul className="mt-6 space-y-3 flex-grow">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start">
                                        <svg className="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-8">
                                <ActionButton 
                                    label={plan.name === "Enterprise" ? "Contact Us" : "Get Started"} 
                                    variant={plan.isPopular ? "primary" : "secondary"}
                                    className="w-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
