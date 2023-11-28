// PentagoCodeSnippet.tsx

export const introDescription: string = `One of the challeneges of this project was implementing a game loop that could handle any combination of human or AI players. A turn in Pentago consists of 3 steps: placing the piece, chosing a quadrent to rotate, and deciding which direction to rotate the quadrant. The nature in which these decisions are made vary dirastically between human and AI players. Human turns need input polling and visual feedback during each step of the process, while AI turns need asynchronous processing time to make all the decisions before any visual updates are made.

The solution I came up with was to use an interface to represent the players, the crux of which is the function "IEnumerator MakeMove(Board b, IEnumerator callback)", abstracting away the differences between human and AI players during decision making, relying on a callback function to ensure parity following the decision.
`;


export const interfaceSnippet: string = `    
public interface IPlayer
{
    int PlayerID {get;}
    void Initialize(int playerID);
    IEnumerator MakeMove(Board b, IEnumerator callback);
}`;


export const gameManagerSnippetDescription: string = `This allows the game manager's "Play" function to be written in a way that is agnostic to the type of player. It simply alternates turns betwen the two players until the game is over.
`;



export const gameManagerSnippet: string = `        
public IEnumerator Play()
{   
    // allow player to choose who goes first
    if(isHumanVsAI) yield return new WaitUntil(() => turnOrderComplete);

    while(!HasWinnerOrTie(board))
    {
        StartCoroutine(player[CurrentPlayer].MakeMove(board, OnMoveComplete()));
        yield return new WaitUntil(() => moveComplete == true);
        moveComplete = false;
    }

    OnGameOver();          
}`;


export const humanSnippetDescription: string = `For human players, the coroutine yields in steps waiting for input and updates to visual representations before continuing. It first waits for a piece to be dropped on the board, then checks for a winner in case the player dropped into five-in-a-row. If they have, the turn ends early. Otherwise, it proceeds to handle the rotation of a board quadrant. Before ending the turn, SetLastBoard() is called, updating a variable in the game manager with the new game state. This facilitates the callback function to determine that visuals do not need to be updated.`;


export const humanSnippet: string = `    
public IEnumerator MakeMove(Board b, IEnumerator callback)
{
    // yield until a piece is dropped
    yield return StartCoroutine(WaitForDrop(b));
    
    // check for winner now that a piece has been dropped, but before lifting a quadrant
    int winner = b.HasWinner();
    if(winner == 0 || winner == 1)
    {
        Pentago.GameManager.instance.SetLastBoard(b);
        StartCoroutine(callback);
        yield break;
    }

    // yield until a quadrant is rotated
    yield return StartCoroutine(WaitForRotation(b));

    // Tell the game manager what the new board state is
    Pentago.GameManager.instance.SetLastBoard(b);

    // Progress to the next turn
    StartCoroutine(callback);
}`;

export const computerSnippetDescription: string = ` For AI turns, an outer coroutine yields until the AI processing is completed asynchronously. The AI processing is done in a separate thread, allowing the game to continue to run while the AI is thinking. Once the AI has made its decision, the internal game state is updated. Unlike during human turns, SetLastBoard() is not called, such that the callback function will update the visuals.
`;

export const computerSnippet: string = `    
public IEnumerator MakeMove(Board b, IEnumerator callback)
{
    Task t = DoAIMove(b, brain, PlayerID);
    yield return new WaitUntil(() => t.IsCompleted);

    StartCoroutine(callback);
}

public async Task GenerateAIMove(Board b, PentagoAI brain, int player)
{
    // run algorithm asynchronously.
    ScoreObject n = b.currentTurn > 6? await Task.Run(() => brain.AlphaBeta(b, player))
        : await Task.Run(() => brain.EarlyDefense(b, player));

    // for rendering moves later
    b.SetMoveData(n.board.movePos, n.board.quadrant, n.board.moveClockwise);

    // for internal state
    b.OccupyCell(player, n.board.movePos);
    b.RotateQuadrant(n.board.quadrant, n.board.moveClockwise);
}`;


export const callbackSnippetDescription: string = `The callback function shown here is responsible for updationg parameters before the next turn. In the case of AI turns, there will be a descrepancy between the internal game state and the visuals, prompting the conditonal to evaluate to true and the visuals to be updated.
`;


export const callbackSnippet: string = `        
IEnumerator OnMoveComplete()
{
    // update the visuals if the board has changed
    if(lastBoard.board[0] != board.board[0] || lastBoard.board[1] != board.board[1])
    {
        StartCoroutine(RenderMove((board.movePos, board.quadrant, board.moveClockwise)));
        yield return new WaitUntil(() => renderComplete == true);
        renderComplete = false;
        SetLastBoard(board);
    }

    CurrentPlayer = CurrentPlayer == 0 ? 1 : 0;
    CurrentTurn++;

    moveComplete = true;
}`;
