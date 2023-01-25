import { GetServerSideProps } from "next";
import gqlclient from "../../gql/client";
import { getEvent } from "../../gql/queries";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDateAndTime } from "@contentful/f36-datetime";
import Head from "next/head";
function Card({
  name,
  picurl,
  description,
  date,
}: {
  name: string;
  picurl: string;
  description: string;
  date: string;
}) {
  return (
    <Link href={`/events/${name.replaceAll(" ", "-")}`} className="cardu">
      <div className="img-container">
        <Image src={picurl} alt="event-photo" fill sizes="100%" />
      </div>
      <div className="stuff-container">
        <h3>{name}</h3>
        <span
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "15ch",
          }}
        >
          {description}
        </span>
        <span>{formatDateAndTime(date, "day")}</span>
      </div>
    </Link>
  );
}

function Cardpast({ name, picurl }: { name: string; picurl: string }) {
  return (
    <Link href={`/events/${name.replaceAll(" ", "-")}`} className="cardp">
      <div className="img-container">
        <Image src={picurl} alt="event-photo" fill sizes="100%" />
      </div>
      <div className="stuff-container">
        <h3>{name}</h3>
      </div>
    </Link>
  );
}

export default function events({ events }: any) {
  useEffect(() => {
    const h2 = (document.querySelector("#events h2") as HTMLElement) || null;
    var tagWidth = h2.offsetWidth;
    h2.onmousemove = (e) => {
      var percent = (e.x / tagWidth) * 255;
      if (h2 != null) {
        h2.style.color = `hsl(${percent},100%,50%)`;
        h2.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
    };
    h2.onmouseleave = (e) => {
      h2.style.color = "white";
      h2.style.textShadow = "0 0 0px black";
    };
  });
  return (
    <section id="events">
      <Head>
        <title>Events of Sketch</title>
      </Head>
      <h2>Ninja Wars !</h2>
      <div className="events-container">
        <div className="upcomings">
          <h3>Upcoming</h3>
          <div className="cards-container">
            {events.upcoming.map((event: any, index: number) => {
              console.log(event);
              return (
                <Card
                  name={event.title}
                  picurl={event.picture.url}
                  description={event.smallDescription}
                  date={event.date}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className="pasts">
          <h3>Past</h3>
          <div className="cards-container">
            {events.past.map((event: any, index: number) => {
              console.log(event);
              return (
                <Cardpast
                  name={event.title}
                  picurl={event.picture.url}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const pastEvent = await gqlclient.request(getEvent, {
    eventType: "past",
    wantDesc: false,
  });
  const upEvent = await gqlclient.request(getEvent, {
    eventType: "upcoming",
    wantDesc: true,
  });
  const events = {
    upcoming: upEvent.eventCollection.items,
    past: pastEvent.eventCollection.items,
  };
  return {
    props: { events },
  };
};
