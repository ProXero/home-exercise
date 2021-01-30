

export const fillValuesToSelectedRange = (data: string[][]) => {
    if (!data || data.length == 0) {
        return Promise.resolve();
    }
    return Excel.run(async context => {
        const range = context.workbook.getSelectedRange();
        const firstCell = range.getCell(0,0);
        const lastCell = firstCell.getOffsetRange(data.length - 1,data[0].length - 1);
        const expandedRange = firstCell.getBoundingRect(lastCell);
        
        expandedRange.values = data;
      });
}