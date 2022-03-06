import Link from "next/link";
import React from "react";

export type GamePreviewProps = {
    id: number;
    emoji: string;
    name: string;
    description: string;
    bgImg: string;
    author: string;
    lineCount: number;
    solutions: [{
        solution: string[]
    }];
    gameLineId: number;
    gameValidInputId: number;
    gameImgReplaceId: number;
    userId: number;
    User: {
        name: string;
    }
}



export const GamePreview: React.FC<{ game : GamePreviewProps}> = ({game}) =>{
    //https://stackoverflow.com/a/8831937
    function hash(str : string) : number {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    function pickSolution() : number {
        let dateHash : number = Math.floor(new Date(Date.now()).getTime() / 86400000);
        let dateHashStr : string = dateHash+""
        let hashed :number = Math.abs(hash(dateHashStr));
        let idx = hashed % game.solutions.length;
        return idx+1;
    }

    return (
        <div className="bg-gradient-to-tr from-black to-gray-900 rounded-xl shadow-slate-500/50 shadow-md p-5 mt-10">
            <h3 className="text-6xl -mt-10 mb-2">{game.emoji}</h3>
            <h3 className="text-3xl font-bold">{game.name} </h3>
            <p className="text-xl font-medium">by {game.User.name}</p>
            <div className="flex flex-row mt-2">
                <div className="mr-5">
                    <p> {game.description}</p>
                    <p className="text-sm font-light">Today's puzzle is #{pickSolution()} out of {game.solutions.length}</p>
                    <p className="flex flex-row text-2xl"><div className="pr-2 active:translate-y-1">👍 </div> / <div className="pl-2 active:translate-y-1">👎</div> </p>
                </div>
                
                <Link href={"games/" + game.name}>
                    <div className="bg-gradient-to-tr from-blue-800 to-blue-500 w-fit h-fit p-2 rounded-lg ml-auto mt-auto text-white">Play {game.name}!</div>
                </Link>
            </div>
            
        </div>
    )
}