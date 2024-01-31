const TO_DO = 0;
const IN_PROGRESS = 1;
const DONE = 2;

type Ticket_s = {
    title: string;
    text: string;
    state: 0 | 1 | 2;
};

const Ticket = (ticket: Ticket_s) => {
    return <div>hello</div>;
};
