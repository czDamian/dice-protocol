import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { IoHandLeftOutline } from "react-icons/io5";
import { source } from "../../app/fonts/fonts";

const faq = [
  {
    id: 1,
    h: "What is Open Governance?",
    p: "Open governance is a decision-making process where all members of a community have the opportunity to participate in discussions and vote on proposals. It aims to be transparent, inclusive, and democratic, allowing everyone to have a say in shaping the future",
  },
  {
    id: 2,
    h: "How do I participate in Voting?",
    p: "You can participate in voting by creating an account, creating or joining a community, and parrticipating in a poll.",
  },
  {
    id: 3,
    h: "Can I create my own Community?",
    p: "You can create you community by signing up with your wallet and going to the create new community tab on your dashboard",
  },
  {
    id: 4,
    h: "Does Voting come with any costs?",
    p: "None Whatsoever",
  },
  {
    id: 5,
    h: "What are the benefits of the platform?",
    p: "You stand a chance of participating in the decision making process of your community wherever and whenever you want to.",
  },
];
export default function AccordionDemo() {
  return (
    <div className="flex flex-col lg:flex-row justify-end items-center p-2 lg:p-12 my-6 gap-20">
      <div className=" w-[45ch] mx-16 text-center lg:text-left flex flex-col items-center lg:items-start">
        <h2
          className={`${source.className} bg-clip-text font-semibold antialiased bg-gradient-to-r from-[#45444a] to-[#EEEBF9] text-5xl my-3 leading-tight text-transparent mb-5`}
        >
          Frequently Asked Questions
        </h2>
        <Link
          href="./about"
          className="hover:underline text-base flex items-center"
        >
          {" "}
          <IoHandLeftOutline className="text-2xl inline-block" /> I need more
          answers, Click Me
        </Link>
      </div>
      <Accordion
        type="single"
        collapsible
        className="lg:w-1/2 grow lg:text-left md:w-3/4 w-11/12"
      >
        {faq.map((f) => (
          <AccordionItem value={f.id} className="border-0" key={f.id}>
            <AccordionTrigger
              className={`${source.className} antialiased md:text-2xl text-xl w-full`}
            >
              {f.h}
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg">
              {f.p}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
