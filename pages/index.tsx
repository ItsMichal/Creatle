import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma';
import { GamePreview, GamePreviewProps } from "../components/Game";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.gameConfig.findMany({
    where: {},
    include: {
      User:{
        select: {
          name: true,
        }
      },
      solutions:{
        select:{
          solution: true,
        }
      }
    }
  })

  console.log(feed);
  return { props: { feed } }
}

type Props = {
  feed: GamePreviewProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h2 className="text-4xl font-bold">Games</h2>
        <main>
          {props.feed.map((game) => (
            <div key={game.name}>
              <GamePreview game={game}></GamePreview>
            </div>
          ))}
        </main>
      </div>
      
    </Layout>
  )
}

export default Blog
