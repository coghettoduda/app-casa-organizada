"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Circle, Home, Calendar, Clock, Sparkles, BookOpen, History, ChevronRight, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Tipos
type Task = {
  id: string
  title: string
  room: string
  frequency: "daily" | "weekly" | "monthly"
  priority: "high" | "medium" | "low"
  estimatedTime: number
  completed: boolean
  lastCompleted?: Date
}

type Room = {
  id: string
  name: string
  icon: string
  tasks: Task[]
}

type Routine = {
  id: string
  name: string
  description: string
  tasks: string[]
}

export default function Home() {
  const [selectedView, setSelectedView] = useState<"dashboard" | "rooms" | "plans" | "quick" | "routines" | "history" | "tips">("dashboard")
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedToday, setCompletedToday] = useState<Task[]>([])

  // Dados iniciais
  useEffect(() => {
    const initialTasks: Task[] = [
      // Cozinha
      { id: "1", title: "Lavar louça", room: "Cozinha", frequency: "daily", priority: "high", estimatedTime: 15, completed: false },
      { id: "2", title: "Limpar bancada", room: "Cozinha", frequency: "daily", priority: "high", estimatedTime: 5, completed: false },
      { id: "3", title: "Passar pano no chão", room: "Cozinha", frequency: "daily", priority: "medium", estimatedTime: 10, completed: false },
      { id: "4", title: "Limpar fogão", room: "Cozinha", frequency: "weekly", priority: "medium", estimatedTime: 20, completed: false },
      { id: "5", title: "Organizar geladeira", room: "Cozinha", frequency: "weekly", priority: "low", estimatedTime: 30, completed: false },
      { id: "6", title: "Limpar forno", room: "Cozinha", frequency: "monthly", priority: "low", estimatedTime: 40, completed: false },
      
      // Banheiro
      { id: "7", title: "Limpar vaso sanitário", room: "Banheiro", frequency: "daily", priority: "high", estimatedTime: 10, completed: false },
      { id: "8", title: "Limpar pia", room: "Banheiro", frequency: "daily", priority: "high", estimatedTime: 5, completed: false },
      { id: "9", title: "Limpar espelho", room: "Banheiro", frequency: "weekly", priority: "medium", estimatedTime: 5, completed: false },
      { id: "10", title: "Lavar box", room: "Banheiro", frequency: "weekly", priority: "medium", estimatedTime: 15, completed: false },
      { id: "11", title: "Limpar azulejos", room: "Banheiro", frequency: "monthly", priority: "low", estimatedTime: 30, completed: false },
      
      // Quartos
      { id: "12", title: "Fazer cama", room: "Quartos", frequency: "daily", priority: "high", estimatedTime: 5, completed: false },
      { id: "13", title: "Organizar roupas", room: "Quartos", frequency: "daily", priority: "medium", estimatedTime: 10, completed: false },
      { id: "14", title: "Trocar roupa de cama", room: "Quartos", frequency: "weekly", priority: "high", estimatedTime: 15, completed: false },
      { id: "15", title: "Aspirar/varrer", room: "Quartos", frequency: "weekly", priority: "medium", estimatedTime: 15, completed: false },
      { id: "16", title: "Limpar armários", room: "Quartos", frequency: "monthly", priority: "low", estimatedTime: 60, completed: false },
      
      // Sala
      { id: "17", title: "Organizar almofadas", room: "Sala", frequency: "daily", priority: "medium", estimatedTime: 3, completed: false },
      { id: "18", title: "Limpar mesa de centro", room: "Sala", frequency: "daily", priority: "medium", estimatedTime: 5, completed: false },
      { id: "19", title: "Aspirar sofá", room: "Sala", frequency: "weekly", priority: "medium", estimatedTime: 10, completed: false },
      { id: "20", title: "Limpar TV e eletrônicos", room: "Sala", frequency: "weekly", priority: "low", estimatedTime: 10, completed: false },
      { id: "21", title: "Lavar cortinas", room: "Sala", frequency: "monthly", priority: "low", estimatedTime: 30, completed: false },
      
      // Área de Serviço
      { id: "22", title: "Lavar roupas", room: "Área de Serviço", frequency: "daily", priority: "high", estimatedTime: 20, completed: false },
      { id: "23", title: "Estender roupas", room: "Área de Serviço", frequency: "daily", priority: "high", estimatedTime: 10, completed: false },
      { id: "24", title: "Passar roupas", room: "Área de Serviço", frequency: "weekly", priority: "medium", estimatedTime: 60, completed: false },
      { id: "25", title: "Limpar máquina de lavar", room: "Área de Serviço", frequency: "monthly", priority: "medium", estimatedTime: 20, completed: false },
    ]

    // Carregar do localStorage ou usar dados iniciais
    const savedTasks = localStorage.getItem("homeTasks")
    const savedCompleted = localStorage.getItem("completedToday")
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks(initialTasks)
    }

    if (savedCompleted) {
      setCompletedToday(JSON.parse(savedCompleted))
    }
  }, [])

  // Salvar no localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("homeTasks", JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("completedToday", JSON.stringify(completedToday))
  }, [completedToday])

  const toggleTask = (taskId: string) => {
    setTasks(prev => {
      const updated = prev.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed
          if (newCompleted && !task.completed) {
            setCompletedToday(prev => [...prev, { ...task, completed: true, lastCompleted: new Date() }])
          }
          return { ...task, completed: newCompleted, lastCompleted: newCompleted ? new Date() : task.lastCompleted }
        }
        return task
      })
      return updated
    })
  }

  const rooms: Room[] = [
    { id: "kitchen", name: "Cozinha", icon: "🍳", tasks: tasks.filter(t => t.room === "Cozinha") },
    { id: "bathroom", name: "Banheiro", icon: "🚿", tasks: tasks.filter(t => t.room === "Banheiro") },
    { id: "bedrooms", name: "Quartos", icon: "🛏️", tasks: tasks.filter(t => t.room === "Quartos") },
    { id: "living", name: "Sala", icon: "🛋️", tasks: tasks.filter(t => t.room === "Sala") },
    { id: "laundry", name: "Área de Serviço", icon: "🧺", tasks: tasks.filter(t => t.room === "Área de Serviço") },
  ]

  const routines: Routine[] = [
    {
      id: "home",
      name: "Dona de Casa em Casa",
      description: "Rotina completa para quem fica em casa durante o dia",
      tasks: ["1", "2", "3", "7", "8", "12", "13", "17", "18", "22", "23"]
    },
    {
      id: "working",
      name: "Trabalha Fora",
      description: "Rotina otimizada para quem tem pouco tempo durante a semana",
      tasks: ["1", "2", "7", "8", "12", "22"]
    },
    {
      id: "weekend",
      name: "Fim de Semana",
      description: "Tarefas mais pesadas para o final de semana",
      tasks: ["4", "5", "9", "10", "14", "15", "19", "20", "24"]
    }
  ]

  const quickModeTasks = tasks
    .filter(t => t.priority === "high" && t.frequency === "daily")
    .sort((a, b) => a.estimatedTime - b.estimatedTime)
    .slice(0, 6)

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const dailyTasks = tasks.filter(t => t.frequency === "daily")
  const weeklyTasks = tasks.filter(t => t.frequency === "weekly")
  const monthlyTasks = tasks.filter(t => t.frequency === "monthly")

  const tips = [
    {
      title: "Organize por Prioridade",
      description: "Comece sempre pelas tarefas de alta prioridade. Elas fazem mais diferença na aparência da casa.",
      icon: "⭐"
    },
    {
      title: "Técnica dos 15 Minutos",
      description: "Dedique 15 minutos por dia a um cômodo específico. Você ficará surpresa com o resultado!",
      icon: "⏰"
    },
    {
      title: "Limpe Conforme Usa",
      description: "Lave a louça logo após usar, limpe respingos imediatamente. Prevenir é mais fácil que limpar depois.",
      icon: "✨"
    },
    {
      title: "Divida Tarefas Grandes",
      description: "Não precisa limpar a casa toda de uma vez. Divida por cômodos e faça um por dia.",
      icon: "📋"
    },
    {
      title: "Use Produtos Multiuso",
      description: "Tenha poucos produtos, mas de qualidade. Menos produtos = menos bagunça embaixo da pia.",
      icon: "🧴"
    },
    {
      title: "Envolva a Família",
      description: "Cada pessoa pode ter suas tarefas. Ensine as crianças desde cedo a colaborar.",
      icon: "👨‍👩‍👧‍👦"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Casa Organizada
                </h1>
                <p className="text-sm text-gray-600">Sua rotina de limpeza simplificada</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {completedTasks}/{totalTasks} tarefas
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <ScrollArea className="w-full">
            <div className="flex gap-2 py-3">
              <Button
                variant={selectedView === "dashboard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("dashboard")}
                className={selectedView === "dashboard" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              >
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
              <Button
                variant={selectedView === "rooms" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("rooms")}
                className={selectedView === "rooms" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Cômodos
              </Button>
              <Button
                variant={selectedView === "plans" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("plans")}
                className={selectedView === "plans" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Planos
              </Button>
              <Button
                variant={selectedView === "quick" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("quick")}
                className={selectedView === "quick" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              >
                <Zap className="w-4 h-4 mr-2" />
                Modo Rápido
              </Button>
              <Button
                variant={selectedView === "routines" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("routines")}
                className={selectedView === "routines" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              >
                <Clock className="w-4 h-4 mr-2" />
                Rotinas
              </Button>
              <Button
                variant={selectedView === "history" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("history")}
                className={selectedView === "history" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              >
                <History className="w-4 h-4 mr-2" />
                Histórico
              </Button>
              <Button
                variant={selectedView === "tips" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedView("tips")}
                className={selectedView === "tips" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Dicas
              </Button>
            </div>
          </ScrollArea>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard */}
        {selectedView === "dashboard" && (
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Progresso de Hoje
                </CardTitle>
                <CardDescription>Você completou {completedTasks} de {totalTasks} tarefas</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% concluído</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-blue-900">Tarefas Diárias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">
                    {dailyTasks.filter(t => t.completed).length}/{dailyTasks.length}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-purple-900">Tarefas Semanais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-700">
                    {weeklyTasks.filter(t => t.completed).length}/{weeklyTasks.length}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-pink-900">Tarefas Mensais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-700">
                    {monthlyTasks.filter(t => t.completed).length}/{monthlyTasks.length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Priority Tasks */}
            <Card className="border-orange-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Prioridades de Hoje
                </CardTitle>
                <CardDescription>Tarefas mais importantes para fazer agora</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks
                    .filter(t => t.priority === "high" && t.frequency === "daily")
                    .slice(0, 5)
                    .map(task => (
                      <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="border-orange-400"
                        />
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-600">{task.room} • {task.estimatedTime} min</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Rooms Overview */}
            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Visão por Cômodo</CardTitle>
                <CardDescription>Progresso de cada área da casa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.map(room => {
                    const completed = room.tasks.filter(t => t.completed).length
                    const total = room.tasks.length
                    const percentage = total > 0 ? (completed / total) * 100 : 0
                    
                    return (
                      <div
                        key={room.id}
                        className="p-4 rounded-lg border-2 border-purple-100 hover:border-purple-300 transition-all cursor-pointer bg-gradient-to-br from-white to-purple-50"
                        onClick={() => setSelectedView("rooms")}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">{room.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{room.name}</h3>
                            <p className="text-sm text-gray-600">{completed}/{total} tarefas</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rooms View */}
        {selectedView === "rooms" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Tarefas por Cômodo</h2>
                <p className="text-gray-600">Organize a limpeza de cada área da casa</p>
              </div>
            </div>

            {rooms.map(room => (
              <Card key={room.id} className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{room.icon}</span>
                    {room.name}
                  </CardTitle>
                  <CardDescription>
                    {room.tasks.filter(t => t.completed).length} de {room.tasks.length} tarefas concluídas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {room.tasks.map(task => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="border-purple-400"
                        />
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {task.frequency === "daily" ? "Diário" : task.frequency === "weekly" ? "Semanal" : "Mensal"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"} prioridade
                            </Badge>
                            <span className="text-sm text-gray-600">{task.estimatedTime} min</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Plans View */}
        {selectedView === "plans" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Planos de Limpeza</h2>
                <p className="text-gray-600">Organize suas tarefas por frequência</p>
              </div>
            </div>

            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Diário</TabsTrigger>
                <TabsTrigger value="weekly">Semanal</TabsTrigger>
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4">
                <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Tarefas Diárias</CardTitle>
                    <CardDescription>Faça todos os dias para manter a casa sempre em ordem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {dailyTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="border-blue-400"
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-600">{task.room} • {task.estimatedTime} min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-4">
                <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Tarefas Semanais</CardTitle>
                    <CardDescription>Faça uma ou duas vezes por semana</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {weeklyTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="border-purple-400"
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-600">{task.room} • {task.estimatedTime} min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monthly" className="space-y-4">
                <Card className="border-pink-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Tarefas Mensais</CardTitle>
                    <CardDescription>Limpezas mais profundas, uma vez por mês</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {monthlyTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="border-pink-400"
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-600">{task.room} • {task.estimatedTime} min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Quick Mode */}
        {selectedView === "quick" && (
          <div className="space-y-6">
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-orange-500" />
                  Modo Rápido: Casa Apresentável em 30 Minutos
                </CardTitle>
                <CardDescription className="text-base">
                  Tarefas essenciais para deixar a casa arrumada rapidamente quando você está sem tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-white rounded-lg border-2 border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Tempo Total Estimado:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {quickModeTasks.reduce((acc, task) => acc + task.estimatedTime, 0)} min
                    </span>
                  </div>
                  <Progress 
                    value={(quickModeTasks.filter(t => t.completed).length / quickModeTasks.length) * 100} 
                    className="h-3"
                  />
                </div>

                <div className="space-y-3">
                  {quickModeTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white border-2 border-orange-100 hover:border-orange-300 transition-all"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold">
                        {index + 1}
                      </div>
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="border-orange-400"
                      />
                      <div className="flex-1">
                        <p className={`font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-600">{task.room}</p>
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        {task.estimatedTime} min
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">💡 Dica Rápida:</h4>
                  <p className="text-sm text-yellow-800">
                    Comece pela sala e cozinha (áreas mais visíveis). Feche portas dos quartos se não der tempo de arrumar tudo!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Routines */}
        {selectedView === "routines" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Rotinas Personalizadas</h2>
                <p className="text-gray-600">Escolha a rotina que melhor se adapta ao seu dia a dia</p>
              </div>
            </div>

            {routines.map(routine => {
              const routineTasks = tasks.filter(t => routine.tasks.includes(t.id))
              const completed = routineTasks.filter(t => t.completed).length
              const total = routineTasks.length
              const percentage = total > 0 ? (completed / total) * 100 : 0

              return (
                <Card key={routine.id} className="border-purple-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{routine.name}</CardTitle>
                    <CardDescription>{routine.description}</CardDescription>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {completed} de {total} tarefas concluídas
                        </span>
                        <span className="text-sm font-bold text-purple-600">{Math.round(percentage)}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {routineTasks.map(task => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="border-purple-400"
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-600">{task.room} • {task.estimatedTime} min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* History */}
        {selectedView === "history" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Histórico de Tarefas</h2>
                <p className="text-gray-600">Veja tudo que você já conquistou!</p>
              </div>
            </div>

            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  Tarefas Concluídas Hoje
                </CardTitle>
                <CardDescription>Parabéns pelo seu progresso!</CardDescription>
              </CardHeader>
              <CardContent>
                {completedToday.length === 0 ? (
                  <div className="text-center py-8">
                    <Circle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">Nenhuma tarefa concluída ainda hoje.</p>
                    <p className="text-sm text-gray-500 mt-1">Comece marcando algumas tarefas como concluídas!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {completedToday.map(task => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-green-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-600">{task.room}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Concluída
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Estatísticas Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                    <p className="text-sm text-blue-900 mb-1">Total de Tarefas</p>
                    <p className="text-3xl font-bold text-blue-700">{totalTasks}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                    <p className="text-sm text-green-900 mb-1">Concluídas Hoje</p>
                    <p className="text-3xl font-bold text-green-700">{completedToday.length}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                    <p className="text-sm text-purple-900 mb-1">Taxa de Conclusão</p>
                    <p className="text-3xl font-bold text-purple-700">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tips */}
        {selectedView === "tips" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Dicas de Organização</h2>
                <p className="text-gray-600">Aprenda truques para manter sua casa sempre organizada</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <Card key={index} className="border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-3xl">{tip.icon}</span>
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  Dica Extra: Método FlyLady
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">
                  O método FlyLady é perfeito para quem se sente sobrecarregada com a limpeza da casa:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700"><strong>Zona da semana:</strong> Divida a casa em 5 zonas e foque em uma por semana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700"><strong>Rotina matinal:</strong> 15 minutos de manhã fazem toda diferença</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700"><strong>Rotina noturna:</strong> Deixe a pia vazia e a cozinha limpa antes de dormir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700"><strong>Progresso, não perfeição:</strong> Qualquer coisa feita é melhor que nada!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">💜 Feito com carinho para facilitar sua rotina</p>
            <p className="text-xs text-gray-500">
              Lembre-se: uma casa organizada não precisa ser perfeita, precisa ser funcional e acolhedora!
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
