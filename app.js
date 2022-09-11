const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({ extended: true}));

const port=process.env.PORT || 3000;


const courses=[
    {id: 1, name:'manish'},
    {id: 2, name:'rohit'},
    {id: 3, name:'punnet'}
]


app.get('/',function(req,res){
    res.send('<h1>Hello World</h1>');
});

app.get('/api/courses',function(req,res){
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)
      res.status(404).send('The course with the given ID not found');
    res.send(course);
})

app.post('/api/courses',(req,res)=>{
    const course={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
})









app.listen(port,function(err){
    if(err){
        console.log('Error while running the server');
        return;
    }
    console.log(`Server is running fine on port....${port}`);
})