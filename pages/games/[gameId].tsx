import React, { useState } from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import prisma from '../../lib/prisma';

enum GameState {
    NEUTRAL,
    INCORRECT,
    CLOSE,
    CORRECT
}

type GameConfigProps = {
    id: number;
    name: string;
    emoji: string;
    bgImg: string;
    solutions: [{
        id: number;
        solution: string[];
    }];
    line : {
        cell: {
            id: number;
            val: string;
            posX: number;
            posY: number;
            width: number;
            height: number;
            foreground: string;
            neutralBg: string;
            closeBg: string;
            correctBg: string;
            incorrectBg: string;
        };
        cellsNumX: number;
        cellsNumY: number;
        height: number;
        width: number;
    };
    inputs : {
        vals: string[];
    }
    User : {
        id: number;
        name: string;
    };
    lineCount: number;
}

export const GamePage : React.FC<GameConfigProps> = (props) => {
    console.log(props);
    if(props != null) {
        return (
            <Layout>
                <GamePlay {...props}/>
            </Layout>
        )
    }else{
        return (
            <Layout>
                Error 404
            </Layout>
        )
    }
    
}

type CellProp = {
    cellState: GameState,
    cellValue: string,
}

export const GameCell : React.FC<{game : GameConfigProps, cellProp : CellProp}> = ({game, cellProp : {cellState, cellValue}}) => {
    let bgText = ""
    if(cellState == GameState.NEUTRAL) {
        bgText =  game.line.cell.neutralBg;
    }else if(cellState == GameState.CLOSE) {
        bgText =  game.line.cell.closeBg;
    }else if(cellState == GameState.CORRECT) {
        bgText = game.line.cell.correctBg;
    }else{
        bgText = game.line.cell.incorrectBg;
    }
    
    let actwidth = game.line.cell.width/10 + "rem";;
    let actheight = game.line.cell.height/10 + "rem";
    return (
        <div className={"text-center mx-auto flex-col flex border"} style={{color:game.line.cell.foreground, backgroundColor:bgText, width:actwidth, height:actheight}}>
            <div className="flex-grow"></div>
            {cellValue}
            <div className="flex-grow"></div>
        </div>
    )
}

type LineProp = {
    cells: CellProp[]
}

export const GameLine : React.FC<{game: GameConfigProps, lineProp: LineProp}> = ({game, lineProp : { cells }}) => {
    return  (
        <div className={"mx-auto w-fit grid gap-4 py-8"} style={{gridTemplateColumns: 'repeat('+game.line.cellsNumX+', minmax(0, 1fr))'}}>
            {cells.map((cell, idx) =>{
                return <GameCell key={"cell_"+idx} game={game} cellProp={cell}></GameCell>
            })}
        </div>
    )
}

type GamePlayState = {
    linesState: LineProp[];
    curLine: number;
    curIdxInLine: number;
    won: boolean;
    gameOver: boolean;
    todaysSolution: string[];
}

export const SingleGameInput : React.FC<{val: string, onClick: (val: string) => void}> = ({val, onClick}) => {
    return (
        <div className="p-2 min-w-fit rounded-md bg-gray-700 text-white flex flex-col" onClick={()=>{onClick(val)}}>
            <div className="flex-grow"></div>
            {val}
            <div className="flex-grow"></div>

        </div>
    )
}

export const GameInput : React.FC<{game: GameConfigProps,
    onDelete: () => void | undefined, 
    onEntry: (val: string) => void, 
    onEnter: () => void | undefined,
}> = ({game, onEntry, onEnter, onDelete}) => {
    console.log(game.inputs);
    return (
        <>
        <div className=" px-10 pt-10 bg-[#111] rounded-t-xl place-content-center flex flex-row flex-wrap gap-4">
            {game.inputs.vals.map((val, idx) =>{
                return <SingleGameInput key={idx} val={val} onClick={onEntry}></SingleGameInput>
            })}
            <div className="p-4 rounded-md bg-red-700 text-white" onClick={onDelete}>⌫</div>
        </div>
        <div className="bg-[#111] rounded-b-xl pt-4 pb-10 text-center" >
            <div className="p-4 w-1/5 min-w-fit mx-auto rounded-md bg-blue-700 text-white" onClick={onEnter}>
                Submit Attempt!
            </div>
        
        </div>
        </>
    )
}


export class GamePlay extends React.Component<GameConfigProps, GamePlayState> {
    state : GamePlayState = {
        linesState : this.fillInitialLines(),
        curLine: 0,
        curIdxInLine: 0,
        won: false,
        gameOver: false,
        todaysSolution: this.pickSolution()
    }

    idxForward(){
        let idx = this.state.curIdxInLine + 1;

        if(idx >= this.props.line.cellsNumX*this.props.line.cellsNumY){
            //Too big
            return this.state.curIdxInLine;
        }else{
            return idx;
        }
    }

    idxBackward(){
        let idx = this.state.curIdxInLine - 1;

        if(idx < 0){
            return 0;
        }else{
            return idx;
        }
    }

    onEntry(val : string) {
        console.log("entered")
        console.log(this);

        let newLinesState = [...this.state.linesState];

        newLinesState[this.state.curLine].cells[this.state.curIdxInLine].cellValue = val

        let newIdx = this.idxForward();

        this.setState(prevState => ({
            ...prevState,
            linesState:newLinesState,
            curIdxInLine: newIdx,
        }));
    }

    onDelete(){
        let newLinesState = [...this.state.linesState];

        newLinesState[this.state.curLine].cells[this.state.curIdxInLine].cellValue = ""

        let newIdx = this.idxBackward();

        this.setState(prevState => ({
            ...prevState,
            linesState:newLinesState,
            curIdxInLine: newIdx,
        }));

    }

    onEnter(){
        //Check if all filled
        //TODO: Update this to have better feedback lol
        for(let i = 0; i < this.state.linesState[this.state.curLine].cells.length; i++){
            if(this.state.linesState[this.state.curLine].cells[i].cellValue == ""){
                return;
            }
        }

        //Okay now fill out the results
        let newLinesState = [...this.state.linesState];

        let gameWon = true;

        for(let i = 0; i < this.state.linesState[this.state.curLine].cells.length; i++){
            let tempVal = this.state.linesState[this.state.curLine].cells[i].cellValue;
            if(tempVal == this.state.todaysSolution[i]){
                newLinesState[this.state.curLine].cells[i].cellState = GameState.CORRECT;
            }else if(this.state.todaysSolution.includes(tempVal)){
                newLinesState[this.state.curLine].cells[i].cellState = GameState.CLOSE;
                gameWon = false;
            }else{
                newLinesState[this.state.curLine].cells[i].cellState = GameState.INCORRECT;
                gameWon = false;
            }
        }

        if(gameWon){
            this.setState(prevState => ({
                ...prevState,
                linesState: newLinesState,
                won: true,
                gameOver: true
            }));
        }else if(this.state.curLine >= this.props.lineCount){
            this.setState(prevState => ({
                ...prevState,
                linesState: newLinesState,
                won: true,
                gameOver: true
            }));
        }else{
            this.setState(prevState => ({
                ...prevState,
                linesState: newLinesState,
                curLine: this.state.curLine+1,
                curIdxInLine: 0
            }))
        }

        //Check game finished

        
    }

    //https://stackoverflow.com/a/8831937
    hash(str : string) : number {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    pickSolution() : string[] {
        let dateHash : number = Math.floor(new Date(Date.now()).getTime() / 86400000);
        let dateHashStr : string = dateHash+""
        let hashed :number = Math.abs(this.hash(dateHashStr));
        let idx = hashed % this.props.solutions.length;
        return this.props.solutions[idx].solution;
    }

    fillInitialLines() : LineProp[] {
        let tempLineProp : LineProp[] = [];
        for(let i = 0; i < this.props.lineCount; i++){
            let tempLProp : LineProp = {
                cells: []
            }
            for(let j = 0; j < (this.props.line.cellsNumX * this.props.line.cellsNumY); j++){
                let tempCProp : CellProp = {
                    cellState: GameState.INCORRECT,
                    cellValue: ""
                }
                tempLProp.cells.push(tempCProp);
            }

            tempLineProp.push(tempLProp);

            // this.setState({
            //     linesState: this.state.linesState.concat(tempLProp),
            //     curLine: 0,
            //     curIdxInLine: 0,
            //     won: false
            // })
        }
        return tempLineProp;
    }

    constructor(props){
        super(props);
        console.log("yikes")
        console.log(props);

    }
    render(){
        return (
            <div>
                <h1 className="text-3xl font-bold">{this.props.name}</h1>
                <p>Attempt #{this.state.curLine+1} out of {this.state.linesState.length}</p>
                <p>State - {this.state.won ? "Won" : "Not Won"} - {this.state.gameOver ? "Game Over" : "Game Ongoing"}</p>
                <p>Solution - <a className="bg-black text-black">{this.state.todaysSolution.map(char => {return char+"/"})}</a></p>
                {this.state.linesState.map((line,idx) => {
                    if(idx <= this.state.curLine){
                        return <>
                            <GameLine key={"line_"+idx} game={this.props} lineProp={line}></GameLine>
                            {!this.state.gameOver && idx == this.state.curLine && <GameInput game={this.props} onEnter={()=>{this.onEnter()}} onDelete={()=>{this.onDelete()}} onEntry={(val: string)=>{this.onEntry(val)}}></GameInput>}
                        </>
                    }
                    // return  <GameLine key={"line_"+idx} game={this.props} lineProp={line}></GameLine>
                })}
            </div>
        )
    }
    
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const game = await prisma.gameConfig.findUnique({
        where: {
            name: String(params?.gameId),
        },
        include: {
            User: {
                select: {
                    id: true,
                    name: true
                }
            },
            solutions : {
                select: {
                    id: true,
                    solution: true,
                }
            },
            line: {
                select: {
                    cell: true,
                    cellsNumY: true,
                    cellsNumX: true,
                    height: true,
                    width: true,
                }
            },
            inputs: {
                select : {
                    vals: true,
                }
            }
        }
    });

    if(game != null){
        return {
            props: game
        }
    }else{
        return {
            props: {}
        }
    }
    
}

export default GamePage