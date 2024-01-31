"use client";
import { useState } from "react";
import Ticket, { MovingTicket_s, Ticket_s } from "@/components/Ticket";

export default function Home() {
    const [ticketsToDo, setTicketsToDo] = useState<Ticket_s[]>([
        { title: "hello" },
    ]);
    const [ticketsInProgress, setTicketsInProgress] = useState<Ticket_s[]>([
        { title: "hello" },
    ]);
    const [ticketsDone, setTicketsDone] = useState<Ticket_s[]>([
        { title: "hello" },
    ]);

    const [activeTicket, setActiveTicket] = useState<
        MovingTicket_s | undefined
    >(undefined);

    const updateTickets = async () => {
        try {
            await fetch("/api", {
                method: "POST",
                body: JSON.stringify(ticketsToDo),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="fixed top-[5%] w-1/2 h-[90%]">
                    <div className="flex flex-col h-full">
                        {/* description */}
                        <div className="bg-beige text-center m-[1%] h-[10%] rounded-lg border-2 border-black flex justify-center items-center">
                            description
                        </div>
                        {/* themes */}
                        <div className="flex flex-row justify-center m-[1%] h-[90%]">
                            <div
                                className="bg-beige w-[32%] rounded-lg border-2 border-black flex justify-center items-center text-gray-400 text-xl"
                                onClick={() => {}}
                            >
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
            <div>
                <Ticket
                    tickets={ticketsToDo}
                    state={0}
                    setActiveTicket={setActiveTicket}
                    setTickets={setTicketsToDo}
                />
                <Ticket
                    tickets={ticketsInProgress}
                    state={1}
                    setActiveTicket={setActiveTicket}
                    setTickets={setTicketsInProgress}
                />
                <Ticket
                    tickets={ticketsDone}
                    state={2}
                    setActiveTicket={setActiveTicket}
                    setTickets={setTicketsDone}
                />
            </div>
        </div>
    );
}
