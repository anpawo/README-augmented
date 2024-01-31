"use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [tickets, setTickets] = useState<Ticket_s[]>([]);

    const updateTickets = async () => {
        try {
            await fetch("/api", {
                method: "POST",
                body: JSON.stringify(tickets),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="fixed top-[5%] w-1/2 h-[90%]">
                <div className="flex flex-col h-full">
                    {/* description */}
                    <div className="bg-beige text-center m-[1%] h-[10%] rounded-lg border-2 border-black flex justify-center items-center">
                        description
                    </div>
                    <div className="flex flex-row justify-center m-[1%] h-[90%]">
                        <div className="bg-beige w-[32%] rounded-lg border-2 border-black flex justify-center items-center text-gray-400 text-xl">
                            todo
                        </div>
                        <div className="mx-[2%] bg-pink-200 w-[32%] rounded-lg border-2 border-black flex justify-center items-center text-gray-400 text-xl">
                            in progress
                        </div>
                        <div className="bg-blue-200 w-[32%] rounded-lg border-2 border-black flex justify-center items-center text-gray-400 text-xl">
                            done
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
