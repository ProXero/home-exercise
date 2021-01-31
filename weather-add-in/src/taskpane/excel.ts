
export const getSelectedRange = (context: Excel.RequestContext) => {
    return context.workbook.getSelectedRange();
};

export const fillValuesToRange = (data: string[][], rangeSelector: (context: Excel.RequestContext) => Excel.Range = getSelectedRange) => {
    if (!data || data.length == 0) {
        return Promise.resolve();
    }
    return Excel.run(async context => {
        const range = rangeSelector(context);
        const firstCell = range.getCell(0,0);
        const lastCell = firstCell.getOffsetRange(data.length - 1,data[0].length - 1);
        const expandedRange = firstCell.getBoundingRect(lastCell);
        
        expandedRange.values = data;
      });
}