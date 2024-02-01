export type Ticket_s = {
    title: string;
};

export type MovingTicket_s = {
    ticket: Ticket_s | undefined;
    x: number | undefined;
    y: number | undefined;
    mouseStartX: number | undefined;
    mouseStartY: number | undefined;
};

type TicketProps = {
    tickets: (Ticket_s | undefined)[];
    state: 0 | 1 | 2;
    setActiveTicket: React.Dispatch<
        React.SetStateAction<MovingTicket_s | undefined>
    >;
    setTickets: React.Dispatch<React.SetStateAction<(Ticket_s | undefined)[]>>;
};

const Ticket = ({
    tickets,
    state,
    setActiveTicket,
    setTickets,
}: TicketProps) => {
    return (
        <div>
            {tickets.map((ticket, index) => {
                return (
                    <div
                        style={{
                            top: `${window.innerHeight * 0.175 + index * 56}px`,
                        }}
                        className={` hover:cursor-pointer h-12 fixed text-center w-[15%] -translate-x-1/2 border border-black rounded-md bg-white shadow-md
                            ${
                                state == 0
                                    ? "left-1/3"
                                    : state == 1
                                    ? "left-1/2"
                                    : "left-2/3"
                            }
                            top-[${(index * 10).toString()}%]
                                    `}
                        key={index}
                        onMouseDown={event => {
                            document.body.style.userSelect = "none";
                            const targetRectangle =
                                event.target.getBoundingClientRect();
                            const mouseStartX =
                                event.clientX - targetRectangle.left;
                            const mouseStartY =
                                event.clientY - targetRectangle.top;

                            // Now mouseX and mouseY represent the click position relative to the element.
                            console.log(
                                `${targetRectangle.left}, ${targetRectangle.top}`
                            );
                            console.log(`${mouseStartX}, ${mouseStartY}.`);

                            setActiveTicket({
                                ticket: tickets[index],
                                x: targetRectangle.left + mouseStartX,
                                y: targetRectangle.top + mouseStartY,
                                mouseStartX: mouseStartX,
                                mouseStartY: mouseStartY,
                            });
                            setTickets(prev =>
                                prev.filter((_, i) => i !== index)
                            );
                        }}
                    >
                        <div className="flex justify-center items-center h-full w-full">
                            {ticket?.title}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Ticket;
