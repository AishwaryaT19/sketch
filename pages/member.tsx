import { GetServerSideProps } from "next";
import { useEffect } from "react";
import gqlclient from "../gql/client";
import { getMembers } from "../gql/queries";
import { AiFillMail, AiFillInstagram } from "react-icons/ai";
import Image from "next/image";
import Head from "next/head";
function Card({
  name,
  picurl,
  domain,
  mail,
  insta,
  tag,
}: {
  name: string;
  picurl: string;
  domain: string;
  mail: string;
  insta: string;
  tag: string;
}) {
  return (
    <div className="card">
      <h3>{name.split(" ")[0]}</h3>
      <span className="tag">{tag}</span>
      <span className="domain">{domain}</span>
      <div className="img-container">
        <Image src={picurl} alt="profile-photo" fill sizes="100%" />
      </div>
      <div className="icon-container">
        <a
          href={"https://instagram.com/" + insta}
          className="insta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram />
        </a>
        <a
          href={"mailto:" + mail}
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillMail />
        </a>
      </div>
    </div>
  );
}

export default function Member({ members }: any) {
  useEffect(() => {
    const h1 = (document.querySelector("#member h1") as HTMLElement) || null;
    var tagWidth = h1.offsetWidth;
    h1.onmousemove = (e) => {
      var percent = (e.x / tagWidth) * 255;
      if (h1 != null) {
        h1.style.color = `hsl(${percent},100%,50%)`;
        h1.style.textShadow = `0 0 8px hsl(${percent},100%,50%)`;
      }
    };
    h1.onmouseleave = (e) => {
      h1.style.color = "white";
      h1.style.textShadow = "0 0 0px black";
    };
  });
  return (
    <section id="member">
      <Head>
        <title>Members of Sketch</title>
      </Head>
      <h1>The Shinobi</h1>
      <div className="member-container">
        <div className="head member-type">
          <h2 className="title">Kage</h2>
          <div className="cards-container">
            {members.heads.map((head: any, index: number) => {
              console.log(head);
              return (
                <Card
                  name={head.name}
                  picurl={head.profilePicture.url}
                  domain={head.domain.title}
                  mail={head.insta}
                  insta={head.mail}
                  tag={head.tag}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className="members member-type">
          <h2 className="title">Jōnin</h2>
          <div className="cards-container">
            {members.members.map((member: any, index: number) => {
              return (
                <Card
                  name={member.name}
                  picurl={member.profilePicture.url}
                  domain={member.domain.title}
                  insta={member.mail}
                  mail={member.insta}
                  tag={member.tag}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className="alumini member-type">
          <h2 className="title"> Jinchūriki</h2>
          <div className="cards-container">
            {members.alumini.map((alumini: any, index: number) => {
              return (
                <Card
                  name={alumini.name}
                  picurl={alumini.profilePicture.url}
                  domain={alumini.domain.title}
                  insta={alumini.mail}
                  mail={alumini.insta}
                  tag={alumini.tag}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const headMem = await gqlclient.request(getMembers, {
    memType: "head",
  });
  const memMem = await gqlclient.request(getMembers, {
    memType: "member",
  });
  const alumMem = await gqlclient.request(getMembers, {
    memType: "alumini",
  });
  const members = {
    heads: headMem.memberCollection.items,
    members: memMem.memberCollection.items,
    alumini: alumMem.memberCollection.items,
  };
  return {
    props: { members },
  };
};
