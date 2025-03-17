export const GetPriceRange = (chartData) => {
    const prices = chartData.map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    console.log("Диапазаны для чарта")
    return { minPrice, maxPrice };
}

export const GetMeanPriceIn90Days = (chartData) => {
    const dailyPrices = [];
    let currentDayPrices = [];
    let currentDay = new Date(chartData[0].time).getDate();
    
    chartData.forEach(item => {
        const itemDay = new Date(item.time).getDate();
        
        if (itemDay !== currentDay) {
            const maxPrice = Math.max(...currentDayPrices);
            dailyPrices.push(maxPrice);
            
            currentDayPrices = [];
            currentDay = itemDay;
        }
        
        currentDayPrices.push(item.price);
    });
    
    if (currentDayPrices.length > 0) {
        const maxPrice = Math.max(...currentDayPrices);
        dailyPrices.push(maxPrice);
    }
    
    return dailyPrices;
}

export const Get90DaysFromCurrentDay = () => {
    const dates = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        
        const day = date.getDate();
        const month = date.toLocaleString('en-EN', { month: 'long' });
        
        dates.push(`${day} ${month}`);
    }
    
    return dates;
}

