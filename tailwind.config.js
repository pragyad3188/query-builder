module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./public/index.html"],
  theme: {
    colors:{
      black: "#1D2025",
      light_black:"#282B30",
      blue:'#5C61F0',
      white:'#FFFFFF',
      white2:'#FFFFFF0D',
      indigo:
      {
        200:'#C7D2FE',
        300:'#A5B4FC',
        700:'#4338CA'
      },
      grey:
      { 
        1:'#6D7175',
        2: "#404348",
        3:"#3D4045",
        4:"#282B30",
        5:"#C4C4C41A"
      }
    },
    extend: {
      backgroundImage: {
        'Main-Background': "url('/src/Images/background.png')",
       }
    },
  },
  plugins: [],
}
