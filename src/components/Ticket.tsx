export type Ticket_s = {
    title: string;
};

export type MovingTicket_s = {
    ticket: Ticket_s;
    x: number;
    y: number;
};

type TicketProps = {
    tickets: Ticket_s[];
    state: 0 | 1 | 2;
    setActiveTicket: React.Dispatch<
        React.SetStateAction<MovingTicket_s | undefined>
    >;
    setTickets: React.Dispatch<React.SetStateAction<Ticket_s[]>>;
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
                        className={`fixed text-center w-[15%] -translate-x-1/2 border-2 border-black rounded-lg
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
                        onClick={event => {
                            setActiveTicket({
                                ticket: tickets[index],
                                x: 0,
                                y: 0,
                            });
                            setTickets(prev =>
                                prev.filter((_, i) => i !== index)
                            );
                        }}
                        onMouseEnter={event => {
                            console.log(`in ${state} ${index}`);
                        }}
                    >
                        {ticket.title}
                    </div>
                );
            })}
        </div>
    );
};

export default Ticket;
