import { GetServerSideProps } from "next";
import Error from "../../components/Error";
import gqlclient from "../../gql/client";
import { getSingleEvent } from "../../gql/queries";
import {
  documentToReactComponents,
  NodeRenderer,
  Options,
} from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { formatDateAndTime } from "@contentful/f36-datetime";
import { BLOCKS } from "@contentful/rich-text-types";
import Head from "next/head";
export default function Event({ data }: { data: any[] }) {
  console.log(data);
  if (data.length == 0) {
    return <Error />;
  }
  const opt: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { url, description, height, width } = node.data.target.fields;
        // data[0].description.links.assets;
        return (
          <Image src={url} alt={description} height={height} width={width} />
        );
      },
    },
  };
  const renderOptions = (links: any): Options => {
    const assetMap = links.assets.block;

    return {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: renderAsset(assetMap),
      },
    };
  };
  function getAsset(arr: any, id: any) {
    var asset = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].sys.id == id) {
        return arr[i];
      }
    }
  }
  const renderAsset =
    (assetMap: Map<string, any>): NodeRenderer =>
    (node) => {
      console.log(node, assetMap);
      const asset = getAsset(assetMap, node.data.target.sys.id);
      if (!asset) {
        return <></>;
      }
      return (
        <Image
          src={asset.url}
          width={asset.width}
          height={asset.height}
          alt={asset.description}
          quality={75}
        />
      );
    };
  return (
    <div id="event-container">
      <Head>
        <title>{data[0].title}</title>
      </Head>
      <div className="head-container">
        <div className="title-container">
          <h2>{data[0].title}</h2>
        </div>
        <div className="img-container">
          <Image src={data[0].picture.url} alt="event" fill sizes="100%" />
        </div>
        <div className="date-container">
          <span>{formatDateAndTime(data[0].date, `day`)}</span>
        </div>
      </div>
      <div className="body-container">
        <div className="description">
          {documentToReactComponents(
            data[0].description.json,
            renderOptions(data[0].description.links)
          )}
        </div>
        {data[0].registrationLink != null &&
          data[0].registrationLink != "" &&
          data[0].registrationLink != " " && (
            <a
              className="regis-button"
              href={data[0].registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const eve = await gqlclient.request(getSingleEvent, {
    eventTitle: String(query.event).replaceAll("-", " "),
  });
  const event = eve.eventCollection.items;
  return {
    props: { data: event },
  };
};
