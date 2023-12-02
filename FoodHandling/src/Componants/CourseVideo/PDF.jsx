import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import styles from './StyleSheet';

function PDF({ userData }) {
  return (
    <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      <View>
          <Text style={styles.title}>Food Safety Certificate</Text>
          <Text>Name: {userData.firstname + ' ' + userData.lastname}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Score: {userData.score}</Text>
          <Text>Total Score: {userData.totalScore}</Text>
          <Text>Percentage: {userData.percentage + '%'}</Text>
      </View>
    </Page>
  </Document>

  );
}


export default PDF;
