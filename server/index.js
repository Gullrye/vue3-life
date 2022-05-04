const express = require('express')
const app = express()

app.use(require('cors')()) //跨域问题
app.use(express.json()) //表示识别客户端发来的json请求
const mongoose = require('mongoose') //引入mongoose包
mongoose.connect('mongodb://localhost:27017/vue3-node-life', (err, db) => {
  if (err) throw err
  console.log('Database created!')
  // db.close()
}) //连接mongodb数据库
// 数据库建模  new mongoose.Schema定义数据库字段
const Life = mongoose.model(
  'Life',
  new mongoose.Schema({
    username: { type: String },
    birth: { type: String },
    lifeEnd: { type: Number },
    lightOrDark: { type: Number },
    firstDay: { type: Number },
    beWorry: { type: Boolean },
    remain: { type: Object },
    percentage: { type: Object }
  })
)
// get一般用于展示数据
app.get('/', async (req, res) => {
  res.send('index')
})
// 新增 Life 账号
app.post('/api/life', async (req, res) => {
  const life = await Life.create(req.body) //一旦用到req.body,我们需要引入express.json()
  res.send({
    message: '添加成功',
    data: []
  })
})
// Life 列表
app.get('/api/life', async (req, res) => {
  const life = await Life.find()
  res.send({
    message: '获取列表成功',
    data: life
  })
})
// 删除 Life
app.delete('/api/life/:id', async (req, res) => {
  await Life.findByIdAndDelete(req.params.id)
  res.send({
    status: true,
    message: '删除成功'
  })
})
// Life 详情
app.get('/api/life/:id', async (req, res) => {
  const life = await Life.findById(req.params.id)
  life.remain = {
    year: (
      life.lifeEnd -
      (new Date().getTime() - new Date(life.birth).getTime()) /
        1000 /
        60 /
        60 /
        24 /
        365
    ).toFixed(2),
    // 今天剩下多少个小时
    dayMinutes: 24 * 60 - new Date().getHours() * 60 - new Date().getMinutes(),
    weekDay: 7 - new Date().getDay(),
    monthDay: getMonthDate() - new Date().getDate(),
    yearMonth: 12 - new Date().getMonth()
  }
  life.percentage = {
    year: ((life.remain.year / life.lifeEnd) * 100).toFixed() + '%',
    dayMinutes: ((life.remain.dayMinutes / (24 * 60)) * 100).toFixed() + '%',
    weekDay: ((life.remain.weekDay / 7) * 100).toFixed() + '%',
    monthDay: ((life.remain.monthDay / getMonthDate()) * 100).toFixed() + '%',
    yearMonth: ((life.remain.yearMonth / 12) * 100).toFixed() + '%'
  }
  res.send({
    message: '获取详情成功',
    data: life
  })
})
// 修改 Life
app.put('/api/life/:id', async (req, res) => {
  const life = await Life.findByIdAndUpdate(req.params.id, req.body) //findByIdAndUpdate方法接收两个参数一个是id，第二个是请求体也就是req.body
  res.send({
    message: '修改成功',
    data: life
  })
})

// 获取当月天数
function getMonthDate() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var d = new Date(year, month, 0)
  return d.getDate()
}
app.listen(3001, () => {
  console.log('http://localhost:3001/')
})
