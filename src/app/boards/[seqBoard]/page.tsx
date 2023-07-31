import React from 'react';

export default function BoardView({ params }: { params: { seqBoard: string } }) {
    return (
        <h1>seqBoard: {params.seqBoard}</h1>
    )
} 