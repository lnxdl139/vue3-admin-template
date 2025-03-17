export const exportToCSV = <T extends Record<string, string | number>>(data: T[], fileName: string, headers?: string[]) => {
  const csvRows = [];
  const currentHeaders = headers? headers : Object.keys(data[0]);
  csvRows.push(currentHeaders.join(','));

  for (const row of data) {
    const values = currentHeaders.map((header) => `"${row[header]}"`);
    csvRows.push(values.join(','));
  }

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  link.remove()
};
