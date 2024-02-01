"use client";
import { useState, useEffect } from "react";
import Ticket, { MovingTicket_s, Ticket_s } from "@/components/Ticket";

export default function Home() {
    const [ticketsToDo, setTicketsToDo] = useState<(Ticket_s | undefined)[]>([
        { title: "hello 1" },
        { title: "hello 2" },
        { title: "hello 3" },
    ]);
    const [ticketsInProgress, setTicketsInProgress] = useState<
        (Ticket_s | undefined)[]
    >([{ title: "hello 1" }, { title: "hello 2" }]);
    const [ticketsDone, setTicketsDone] = useState<(Ticket_s | undefined)[]>([
        { title: "hello" },
    ]);
    const [ticketToAdd, setTicketToAdd] = useState<Ticket_s | undefined>(
        undefined
    );
    const [activeTicket, setActiveTicket] = useState<
        MovingTicket_s | undefined
    >(undefined);

    useEffect(() => {
        console.log(activeTicket, ticketToAdd);
        if (ticketToAdd) {
            console.log("adding ticket");
            setActiveTicket(undefined);
            setTicketsToDo(prev => [...prev, ticketToAdd]);
        }
    }, [ticketToAdd]);

    useEffect(() => {
        setTicketToAdd(undefined);
    }, [ticketsToDo, ticketsInProgress, ticketsDone]);

    const getZone = (event: MouseEvent) => {
        if (
            window.innerWidth * 0.25 < event.clientX &&
            event.clientX < window.innerWidth * 0.41
        ) {
            return 0;
        }
        return -1;
    };

    useEffect(() => {
        document.addEventListener("mouseup", event => {
            if (!activeTicket) {
                return;
            }
            const zone = getZone(event);
            if (zone == 0) {
                setTicketToAdd(activeTicket.ticket);
            }
        });
        document.addEventListener("mousemove", event => {
            if (!activeTicket) {
                return;
            }
            // inZone(event);
            setActiveTicket(prev => ({
                mouseStartX: prev?.mouseStartX,
                mouseStartY: prev?.mouseStartY,
                x: event.clientX,
                y: event.clientY,
                ticket: prev?.ticket,
            }));
        });
    }, []);

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
            <div>
                {activeTicket && (
                    <div
                        style={{
                            left: `${
                                activeTicket?.x - activeTicket?.mouseStartX
                            }px`,
                            top: `${
                                activeTicket?.y - activeTicket?.mouseStartY
                            }px`,
                        }}
                        className={` hover:cursor-pointer h-12 fixed text-center w-[15%] border border-black rounded-md bg-white shadow-md`}
                    >
                        <div className="flex justify-center items-center h-full w-full">
                            {activeTicket?.ticket?.title}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
