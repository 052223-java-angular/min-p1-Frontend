export interface ModifyBuildPayload {
    userId: string
    buildId: string
    name: string
    pokemonName: string
    natureName: string
    abilityName: string
    description: string
    learnedMoves: string[]
}