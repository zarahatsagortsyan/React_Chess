import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Position {
  row: number;
  col: number;
}

const ChessBoard: React.FC = () => {
  const [bishopPosition, setBishopPosition] = useState<Position>({ row: 3, col: 3 });
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  const handleSquarePress = (row: number, col: number): void => {
    if (possibleMoves.some(move => move.row === row && move.col === col)) {
      setBishopPosition({ row, col });
      setPossibleMoves([]);
    } else if (bishopPosition.row === row && bishopPosition.col === col) {
      const moves = calculatePossibleMoves(row, col);
      setPossibleMoves(moves);
    }
  };

  const calculatePossibleMoves = (row: number, col: number): Position[] => {
    const moves: Position[] = [];
    for (let i = 1; i < 8; i++) {
      if (row - i >= 0 && col - i >= 0) moves.push({ row: row - i, col: col - i });
      if (row - i >= 0 && col + i < 8) moves.push({ row: row - i, col: col + i });
      if (row + i < 8 && col - i >= 0) moves.push({ row: row + i, col: col - i });
      if (row + i < 8 && col + i < 8) moves.push({ row: row + i, col: col + i });
    }
    return moves;
  };

  const isSquareBlack = (row: number, col: number): boolean => {
    return (row + col) % 2 === 1;
  };

  const rowLabels = [8, 7, 6, 5, 4, 3, 2, 1];
  const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <View style={styles.boardContainer}>
      {/* Column labels at the top */}
      <View style={styles.columnLabelsContainer}>
        <View style={styles.emptyCorner} />
        {colLabels.map((label, index) => (
          <Text key={index} style={styles.labelText}>{label}</Text>
        ))}
        <View style={styles.emptyCorner} />
      </View>

      {/* Main chessboard with row labels on both sides */}
      {rowLabels.map((label, rowIndex) => (
        <View key={rowIndex} style={styles.mainRow}>
          {/* Row label on the left */}
          <Text style={styles.labelText}>{label}</Text>
          
          {/* Chessboard row */}
          <View style={styles.row}>
            {colLabels.map((_, colIndex) => {
              const isBishop = bishopPosition.row === rowIndex && bishopPosition.col === colIndex;
              const isPossibleMove = possibleMoves.some(
                (move) => move.row === rowIndex && move.col === colIndex
              );

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.square,
                    {
                      backgroundColor: isPossibleMove
                        ? '#aaffaa'
                        : isBishop
                        ? '#ffaa00'
                        : isSquareBlack(rowIndex, colIndex)
                        ? '#8B4513' // Dark brown for black squares
                        : '#F5DEB3', // Light beige for white squares
                    },
                  ]}
                  onPress={() => handleSquarePress(rowIndex, colIndex)}
                >
                  {isBishop && <Text style={styles.bishop}>♗</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Row label on the right */}
          <Text style={styles.labelText}>{label}</Text>
        </View>
      ))}

      {/* Column labels at the bottom */}
      <View style={styles.columnLabelsContainer}>
        <View style={styles.emptyCorner} />
        {colLabels.map((label, index) => (
          <Text key={index} style={styles.labelText}>{label}</Text>
        ))}
        <View style={styles.emptyCorner} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  columnLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bishop: {
    fontSize: 40,
  },
  labelText: {
    color: '#fff',
    fontSize: 16,
    width: 70,
    textAlign: 'center',
  },
  emptyCorner: {
    width: 5,
  },
});

export default ChessBoard;
