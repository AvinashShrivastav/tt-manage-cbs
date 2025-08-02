function TimetableCell({ day, time, course, year, section }: { day: string; time: string; course: string; year: string; section: string })
function TimetableCell({ day, time, course, year, section }: { day: string; time: string; course: string; year: string; section: string })
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users, Calendar, Settings, BookOpen, Clock, FileText } from "lucide-react"




export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        setIsLoggedIn(true)
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">SSCBS Portal</CardTitle>
            <CardDescription>Sign in to access the timetable management system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // After login, render the main app tabs with college name/logo header and Logout button
  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
    setError("")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="College Logo" className="h-14 w-14 rounded-full border border-blue-200 bg-white shadow" />
          <div>
            <h1 className="text-3xl font-bold text-blue-900 leading-tight">SSCBS Portal</h1>
            <p className="text-sm text-blue-700">Shaheed Sukhdev College of Business Studies</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout} className="h-10 px-4 font-semibold text-blue-900 border-blue-600 hover:bg-blue-50">
          Logout
        </Button>
      </div>
      <AppTabs />
    </div>
  )
// ...existing code...

function AppTabs() {
  const [activeTab, setActiveTab] = useState("dashboard")
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 w-full flex justify-between gap-2 bg-white rounded-lg shadow-sm p-1">
        <TabsTrigger value="dashboard" className="flex-1 flex items-center justify-center gap-2">
          <GraduationCap className="w-4 h-4" /> Dashboard
        </TabsTrigger>
        <TabsTrigger value="timetable" className="flex-1 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" /> Timetable
        </TabsTrigger>
        <TabsTrigger value="students" className="flex-1 flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" /> Students
        </TabsTrigger>
        <TabsTrigger value="faculty" className="flex-1 flex items-center justify-center gap-2">
          <Users className="w-4 h-4" /> Faculty
        </TabsTrigger>
        <TabsTrigger value="subjects" className="flex-1 flex items-center justify-center gap-2">
          <Users className="w-4 h-4" /> Subjects
        </TabsTrigger>
        <TabsTrigger value="schedules" className="flex-1 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" /> Schedules
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex-1 flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" /> Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard"><DashboardContent /></TabsContent>
      <TabsContent value="timetable"><TimetableContent /></TabsContent>
      <TabsContent value="students"><StudentsContent /></TabsContent>
      <TabsContent value="faculty"><FacultyContent /></TabsContent>
      <TabsContent value="subjects"><SubjectsContent /></TabsContent>
      <TabsContent value="schedules"><SchedulesContent /></TabsContent>
      <TabsContent value="settings"><SettingsContent /></TabsContent>
    </Tabs>
  )
}

// ...existing code...
}
// ...existing code...

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your timetable management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">BMS, BFIA, CS, Cyber Security</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Teaching staff</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Scheduled classes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for timetable management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Create New Timetable
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Add New Faculty
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Manage Students
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View All Schedules
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates to the timetable system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">BMS 4th Year timetable updated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New faculty added to CS department</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Room allocation updated for BFIA</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TimetableContent() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedSection, setSelectedSection] = useState("")

  useEffect(() => {
    setSelectedSemester("");
  }, [selectedYear]);

  const availableSemesters = () => {
    switch (selectedYear) {
      case "1":
        return ["1", "2"];
      case "2":
        return ["3", "4"];
      case "3":
        return ["5", "6"];
      case "4":
        return ["7", "8"];
      default:
        return [];
    }
  };

  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Timetable Management</h2>
        <p className="text-gray-600">Create and manage class schedules</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create/Edit Timetable</CardTitle>
          <CardDescription>Select course, year, semester and section to manage timetable</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Course</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                <option value="BMS">BMS (Bachelor of Management Studies)</option>
                <option value="BFIA">BFIA (Bachelor of Financial Investment Analysis)</option>
                <option value="CS">Computer Science</option>
                <option value="CyberSec">Cyber Security (PG)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                disabled={!selectedYear}
              >
                <option value="">Select Semester</option>
                {availableSemesters().map(sem => (
                  <option key={sem} value={sem}>{sem}{sem === "1" ? "st" : sem === "2" ? "nd" : sem === "3" ? "rd" : "th"} Sem</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Section</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select Section</option>
                {selectedCourse === "BMS" && (
                  <>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </>
                )}
                {selectedCourse === "BFIA" && (
                  <>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </>
                )}
                {(selectedCourse === "CS" || selectedCourse === "CyberSec") && <option value="A">Section A</option>}
              </select>
            </div>
          </div>

          {selectedCourse && selectedYear && selectedSection && selectedSemester && (
            <div className="mt-6">
              <TimetableGrid course={selectedCourse} year={selectedYear} section={selectedSection} semester={selectedSemester} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { getNextDay, formatGoogleCalendarDate } from "@/lib/utils"

function TimetableGrid({ course, year, semester, section }: { course: string; year: string; semester: string; section: string }) {
  const [entries, setEntries] = useState([]);
  const timeSlots = [
    "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00",
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00",
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const fetchEntries = async () => {
    const res = await fetch(
      `http://localhost:5000/api/timetable?course=${course}&year=${year}&semester=${semester}&section=${section}`
    );
    const data = await res.json();
    if (res.ok) setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, [course, year, semester, section]);

  const handleSave = () => {
    fetchEntries();
  };

  const handleNotify = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/timetable/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, year, semester, section, entries }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Notifications sent successfully!");
      } else {
        alert(data.message || "Failed to send notifications.");
      }
    } catch (err) {
      alert("Network error while sending notifications.");
    }
  };

  const handleExportToCalendar = () => {
    entries.forEach(entry => {
      const [startTime, endTime] = entry.timeSlot.split("-");
      const startDate = getNextDay(entry.day);
      const endDate = new Date(startDate);

      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(entry.subject.name)}&dates=${formatGoogleCalendarDate(startDate, startTime)}/${formatGoogleCalendarDate(endDate, endTime)}&details=${encodeURIComponent(`Faculty: ${entry.faculty.name}`)}&location=${encodeURIComponent(entry.room.name)}`;

      window.open(googleCalendarUrl, "_blank");
    });
  };

  const handleExportPdf = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/timetable/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, year, semester, section, entries }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `timetable_${course}_${year}_${semester}_${section}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to export PDF");
      }
    } catch (err) {
      alert("Network error while exporting PDF");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Timetable for {course} {year}
          {year === "1" ? "st" : year === "2" ? "nd" : year === "3" ? "rd" : "th"} Year - Section {section}
        </h3>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportToCalendar} type="button">
            <Calendar className="w-4 h-4 mr-2" />
            Export to Calendar
          </Button>
          <Button size="sm" onClick={handleNotify} type="button">Notify</Button>
          <Button variant="outline" size="sm" onClick={handleExportPdf} type="button">
            <FileText className="w-4 h-4 mr-2" />
            Export to PDF
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-left font-medium">Time</th>
              {days.map((day) => (
                <th key={day} className="border border-gray-300 p-2 text-center font-medium min-w-[150px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time}>
                <td className="border border-gray-300 p-2 font-medium bg-gray-50">{time}</td>
                {days.map((day) => {
                  // Find entry for this cell
                  const cellEntry = entries.find(
                    (e) => e.day === day && e.timeSlot === time
                  );
                  return (
                    <td key={`${day}-${time}`} className="border border-gray-300 p-1">
                      <TimetableCell
                        day={day}
                        time={time}
                        course={course}
                        year={year}
                        semester={semester}
                        section={section}
                        entry={cellEntry}
                        onSave={handleSave}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TimetableCell({ day, time, course, year, semester, section, entry, onSave }: { day: string; time: string; course: string; year: string; semester: string; section: string; entry?: any, onSave: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [cellData, setCellData] = useState({
    subject: entry?.subject?._id || "",
    subjectType: entry?.subjectType || "",
    faculty: entry?.faculty?._id || "",
    room: entry?.room?._id || "",
    labGroup: entry?.labGroup || "",
  });

  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableFaculty, setAvailableFaculty] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    setCellData({
      subject: entry?.subject?._id || "",
      subjectType: entry?.subjectType || "",
      faculty: entry?.faculty?._id || "",
      room: entry?.room?._id || "",
      labGroup: entry?.labGroup || "",
    });
  }, [entry]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [subjectsRes, facultyRes, roomsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/subjects?course=${course}&year=${year}&semester=${semester}`),
          fetch('http://localhost:5000/api/faculty'),
          fetch('http://localhost:5000/api/rooms'),
        ]);

        if (subjectsRes.ok) {
          const subjectsData = await subjectsRes.json();
          setAvailableSubjects(subjectsData);
        }
        if (facultyRes.ok) {
          const facultyData = await facultyRes.json();
          setAvailableFaculty(facultyData);
        }
        if (roomsRes.ok) {
          const roomsData = await roomsRes.json();
          setAvailableRooms(roomsData);
        }
      } catch (error) {
        console.error("Failed to fetch dropdown data", error);
      }
    };

    if (isEditing) {
      fetchDropdownData();
    }
  }, [isEditing, course, year, semester]);

  // Add POST method for saving timetable entry with validation
  const handleSaveTimetableEntry = async () => {
    // Validate required fields
    if (!course || !year || !semester || !section || !day || !time || !cellData.subject || !cellData.subjectType || !cellData.faculty || !cellData.room) {
      alert("Please fill all required fields before saving.");
      return;
    }
    const selectedSubject = availableSubjects.find(s => s._id === cellData.subject);
    const entryData = {
      course,
      year,
      semester,
      section,
      day,
      timeSlot: time,
      subject: cellData.subject,
      subjectCode: selectedSubject?.code || "123",
      subjectType: cellData.subjectType,
      faculty: cellData.faculty,
      room: cellData.room,
      labGroup: cellData.labGroup,
    }

    const url = entry?._id ? `http://localhost:5000/api/timetable/${entry._id}` : "http://localhost:5000/api/timetable";
    const method = entry?._id ? "PUT" : "POST";

    try {
      console.log("Saving timetable entry:", entryData);
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryData),
      })
      if (res.ok) {
        setIsEditing(false);
        onSave();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to save timetable entry");
      }
    } catch (err) {
      alert("Network error while saving timetable entry");
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-2 p-2 min-h-[140px]">
        <select
          className="w-full text-xs p-1 border rounded"
          value={cellData.subject}
          onChange={(e) => setCellData({ ...cellData, subject: e.target.value, subjectType: "" })}
        >
          <option value="">Select Subject</option>
          {availableSubjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.name} ({subject.code})
            </option>
          ))}
        </select>

        {cellData.subject && (
          <select
            className="w-full text-xs p-1 border rounded"
            value={cellData.subjectType}
            onChange={(e) => setCellData({ ...cellData, subjectType: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="theory">Theory Class</option>
            <option value="lab">Lab Session</option>
            <option value="tutorial">Tutorial</option>
          </select>
        )}

        {cellData.subjectType === "lab" && (
          <select
            className="w-full text-xs p-1 border rounded"
            value={cellData.labGroup}
            onChange={(e) => setCellData({ ...cellData, labGroup: e.target.value })}
          >
            <option value="">Select Lab Group</option>
            <option value="G1">Group G1</option>
            <option value="G2">Group G2</option>
            <option value="Both">Both Groups</option>
          </select>
        )}

        <select
          className="w-full text-xs p-1 border rounded"
          value={cellData.faculty}
          onChange={(e) => setCellData({ ...cellData, faculty: e.target.value })}
        >
          <option value="">Select Faculty</option>
          {availableFaculty.map((faculty) => (
            <option key={faculty._id} value={faculty._id}>
              {faculty.name}
            </option>
          ))}
        </select>

        <select
          className="w-full text-xs p-1 border rounded"
          value={cellData.room}
          onChange={(e) => setCellData({ ...cellData, room: e.target.value })}
        >
          <option value="">Select Room</option>
          {availableRooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name} ({room.number})
            </option>
          ))}
        </select>

        <div className="flex space-x-1">
          <Button size="sm" className="text-xs h-6 px-2" onClick={handleSaveTimetableEntry}>
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-6 px-2 bg-transparent"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "theory":
        return "text-blue-900 bg-blue-50"
      case "lab":
        return "text-green-900 bg-green-50"
      case "tutorial":
        return "text-purple-900 bg-purple-50"
      default:
        return "text-gray-900"
    }
  }

  const getGroupColor = (group: string) => {
    switch (group) {
      case "G1":
        return "bg-blue-100 text-blue-800"
      case "G2":
        return "bg-green-100 text-green-800"
      case "Both":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-[80px] p-2 cursor-pointer hover:bg-gray-50 rounded" onClick={() => setIsEditing(true)}>
      {entry?.subject ? (
        <div className="space-y-1">
          <div className={`text-xs font-medium px-2 py-1 rounded ${getTypeColor(entry.subjectType)}`}>
            {entry.subject.name}
            {entry.subjectType && (
              <span className="ml-1 text-xs">
                ({entry.subjectType === "theory" ? "TH" : entry.subjectType === "lab" ? "LAB" : "TUT"})
              </span>
            )}
          </div>
          {entry.subjectType === "lab" && entry.labGroup && (
            <div className={`text-xs px-2 py-1 rounded ${getGroupColor(entry.labGroup)}`}>{entry.labGroup}</div>
          )}
          <div className="text-xs text-gray-600">{entry.faculty.name}</div>
          <div className="text-xs text-gray-500">{entry.room.name}</div>
        </div>
      ) : (
        <div className="text-xs text-gray-400 text-center">Click to add class</div>
      )}
    </div>
  )
}


function FacultyContent() {
  const [faculties, setFaculties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFaculties = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/api/faculty", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          setError(data.message || `Failed to fetch faculty list (Status: ${res.status})`)
          console.error("Faculty fetch error:", data)
          return
        }
        const data = await res.json()
        setFaculties(data)
      } catch (err) {
        setError("Network error. Is the backend running at http://localhost:5000?")
        console.error("Network error fetching faculty:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchFaculties()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Faculty Management</h2>
          <p className="text-gray-600">Manage teaching staff and their details</p>
        </div>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add New Faculty
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculty List</CardTitle>
          <CardDescription>All registered faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">
              {error}
              <div className="text-xs text-gray-500 mt-2">
                If you see a network error, make sure your backend is running and accessible at <code>http://localhost:5000/api/faculty</code>.<br />
                Check browser console for more details.
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Department</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Phone</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faculties.map((faculty) => (
                    <tr key={faculty._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{faculty.name}</td>
                      <td className="p-2">{faculty.department}</td>
                      <td className="p-2 text-blue-600">{faculty.email}</td>
                      <td className="p-2">{faculty.phone}</td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


function StudentsContent() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    course: "",
    year: "",
    section: "",
    group: "G1"
  })
  const [addError, setAddError] = useState("")
  const [addLoading, setAddLoading] = useState(false)

  const fetchStudents = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("http://localhost:5000/api/students")
      const data = await res.json()
      if (res.ok) {
        setStudents(data)
      } else {
        setError(data.message || "Failed to fetch student list")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchStudents() }, [])

  const handleAddStudent = async (e) => {
    e.preventDefault()
    setAddLoading(true)
    setAddError("")
    try {
      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm)
      })
      const data = await res.json()
      if (res.ok) {
        setShowAdd(false)
        setAddForm({ name: "", rollNo: "", email: "", course: "", year: "", section: "", group: "G1" })
        fetchStudents()
      } else {
        setAddError(data.message || "Failed to add student")
      }
    } catch (err) {
      setAddError("Network error")
    } finally {
      setAddLoading(false)
    }
  }

  const [filters, setFilters] = useState({
    course: "",
    year: "",
    section: "",
    group: "",
    search: "",
  })

  const [showGroupAssignment, setShowGroupAssignment] = useState(false)

  // Auto-assign groups based on roll number
  const autoAssignGroups = (course: string, year: string, section: string) => {
    const courseStudents = students.filter((s) => s.course === course && s.year === year && s.section === section)

    // Sort by roll number
    courseStudents.sort((a, b) => a.rollNo.localeCompare(b.rollNo))

    // Split into two groups
    const midPoint = Math.ceil(courseStudents.length / 2)

    const updatedStudents = students.map((student) => {
      const index = courseStudents.findIndex((s) => s.id === student.id)
      if (index !== -1) {
        return {
          ...student,
          group: index < midPoint ? "G1" : "G2",
        }
      }
      return student
    })

    setStudents(updatedStudents)
  }

  // Filter students based on selected filters
  const filteredStudents = students.filter((student) => {
    return (
      (filters.course === "" || student.course === filters.course) &&
      (filters.year === "" || student.year === filters.year) &&
      (filters.section === "" || student.section === filters.section) &&
      (filters.group === "" || student.group === filters.group) &&
      (filters.search === "" ||
        student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.email.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Manage student records, groups, and email lists</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setShowGroupAssignment(true)}>
            Manage Groups
          </Button>
          <Button variant="outline">Import Students</Button>
        <Button onClick={() => setShowAdd(true)}>
          <BookOpen className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      {/* Add Student Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-3">
              <Input placeholder="Name" value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })} required />
              <Input placeholder="Roll No" value={addForm.rollNo} onChange={e => setAddForm({ ...addForm, rollNo: e.target.value })} required />
              <Input placeholder="Email" type="email" value={addForm.email} onChange={e => setAddForm({ ...addForm, email: e.target.value })} required />
              <Input placeholder="Course" value={addForm.course} onChange={e => setAddForm({ ...addForm, course: e.target.value })} required />
              <Input placeholder="Year" value={addForm.year} onChange={e => setAddForm({ ...addForm, year: e.target.value })} required />
              <Input placeholder="Section" value={addForm.section} onChange={e => setAddForm({ ...addForm, section: e.target.value })} required />
              <select className="w-full p-2 border rounded-md" value={addForm.group} onChange={e => setAddForm({ ...addForm, group: e.target.value })} required>
                <option value="G1">Group G1</option>
                <option value="G2">Group G2</option>
              </select>
              {addError && <div className="text-red-600 text-sm">{addError}</div>}
              <div className="flex space-x-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowAdd(false)} disabled={addLoading}>Cancel</Button>
                <Button type="submit" disabled={addLoading}>{addLoading ? "Adding..." : "Add Student"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      </div>

      {/* Group Assignment Modal */}
      {showGroupAssignment && (
        <Card>
          <CardHeader>
            <CardTitle>Lab Group Assignment</CardTitle>
            <CardDescription>
              Automatically assign students to lab groups (G1 & G2) based on roll numbers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Course</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select Course</option>
                  <option value="BMS">BMS</option>
                  <option value="BFIA">BFIA</option>
                  <option value="CS">Computer Science</option>
                  <option value="CyberSec">Cyber Security</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Group Assignment Logic</h4>
              <p className="text-sm text-blue-800">
                Students will be automatically divided into two groups (G1 & G2) based on their roll numbers:
                <br />• First half of students (by roll number) → Group G1
                <br />• Second half of students (by roll number) → Group G2
                <br />• This ensures balanced lab groups for practical sessions
              </p>
            </div>

            <div className="flex space-x-2">
              <Button onClick={() => autoAssignGroups("BMS", "3rd", "A")}>Auto-Assign Groups</Button>
              <Button variant="outline" onClick={() => setShowGroupAssignment(false)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>All registered students with group assignments</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <Input
                  placeholder="Search by name, roll no, email..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Course</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.course}
                  onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                >
                  <option value="">All Courses</option>
                  <option value="BMS">BMS</option>
                  <option value="BFIA">BFIA</option>
                  <option value="CS">Computer Science</option>
                  <option value="CyberSec">Cyber Security</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                >
                  <option value="">All Years</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.section}
                  onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                >
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Lab Group</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.group}
                  onChange={(e) => setFilters({ ...filters, group: e.target.value })}
                >
                  <option value="">All Groups</option>
                  <option value="G1">Group G1</option>
                  <option value="G2">Group G2</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filteredStudents.length} of {students.length} students
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({ course: "", year: "", section: "", group: "", search: "" })}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Roll No</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Course</th>
                  <th className="text-left p-2">Year</th>
                  <th className="text-left p-2">Section</th>
                  <th className="text-left p-2">Lab Group</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-sm">{student.rollNo}</td>
                    <td className="p-2 font-medium">{student.name}</td>
                    <td className="p-2">{student.course}</td>
                    <td className="p-2">{student.year}</td>
                    <td className="p-2">{student.section}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.group === "G1" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {student.group}
                      </span>
                    </td>
                    <td className="p-2 text-blue-600">{student.email}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Group Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Group Distribution</CardTitle>
            <CardDescription>Current lab group assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Group G1</span>
                <span className="text-sm text-gray-600">
                  {students.filter((s) => s.group === "G1").length} students
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Group G2</span>
                <span className="text-sm text-gray-600">
                  {students.filter((s) => s.group === "G2").length} students
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Students by course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["BMS", "BFIA", "CS", "CyberSec"].map((course) => (
                <div key={course} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{course}</span>
                  <span className="text-sm text-gray-600">
                    {students.filter((s) => s.course === course).length} students
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


function SubjectsContent() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/api/subjects", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          setError(data.message || `Failed to fetch subjects (Status: ${res.status})`)
          return
        }
        const data = await res.json()
        setSubjects(data)
      } catch (err) {
        setError("Network error. Is the backend running at http://localhost:5000?")
      } finally {
        setLoading(false)
      }
    }
    fetchSubjects()
  }, [])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    course: "",
    year: "",
    totalCredits: 0,
    theoryCredits: 0,
    labCredits: 0,
    tutorialCredits: 0,
    semester: "",
    department: "",
  })

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.code) {
      setSubjects([...subjects, { ...newSubject, id: Date.now() }])
      setNewSubject({
        name: "",
        code: "",
        course: "",
        year: "",
        totalCredits: 0,
        theoryCredits: 0,
        labCredits: 0,
        tutorialCredits: 0,
        semester: "",
        department: "",
      })
      setShowAddForm(false)
    }
  }

  const getWeeklyClasses = (subject: any) => {
    // In Indian system: Theory = 1 credit = 1 class/week, Lab = 1 credit = 1 session/week (but longer duration)
    return {
      theory: subject.theoryCredits,
      lab: Math.ceil(subject.labCredits / 2), // Lab credits usually count as 2 credits per session
      tutorial: subject.tutorialCredits,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subject Management</h2>
          <p className="text-gray-600">Manage subjects with credit structure for proper timetable allocation</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <BookOpen className="w-4 h-4 mr-2" />
          Add New Subject
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Subject</CardTitle>
            <CardDescription>Enter subject details with credit structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject Name</Label>
                <Input
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  placeholder="e.g., Business Mathematics"
                />
              </div>
              <div className="space-y-2">
                <Label>Subject Code</Label>
                <Input
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  placeholder="e.g., BMS101"
                />
              </div>
              <div className="space-y-2">
                <Label>Course</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newSubject.course}
                  onChange={(e) => setNewSubject({ ...newSubject, course: e.target.value })}
                >
                  <option value="">Select Course</option>
                  <option value="BMS">BMS</option>
                  <option value="BFIA">BFIA</option>
                  <option value="CS">Computer Science</option>
                  <option value="CyberSec">Cyber Security</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newSubject.year}
                  onChange={(e) => setNewSubject({ ...newSubject, year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Semester</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newSubject.semester}
                  onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
                >
                  <option value="">Select Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input
                  value={newSubject.department}
                  onChange={(e) => setNewSubject({ ...newSubject, department: e.target.value })}
                  placeholder="e.g., Mathematics"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Credit Structure</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Total Credits</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={newSubject.totalCredits}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, totalCredits: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Theory Credits</Label>
                  <Input
                    type="number"
                    min="0"
                    max="8"
                    value={newSubject.theoryCredits}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, theoryCredits: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                  <p className="text-xs text-gray-500">1 credit = 1 class/week</p>
                </div>
                <div className="space-y-2">
                  <Label>Lab Credits</Label>
                  <Input
                    type="number"
                    min="0"
                    max="6"
                    value={newSubject.labCredits}
                    onChange={(e) => setNewSubject({ ...newSubject, labCredits: Number.parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-gray-500">2 credits = 1 lab session/week</p>
                </div>
                <div className="space-y-2">
                  <Label>Tutorial Credits</Label>
                  <Input
                    type="number"
                    min="0"
                    max="4"
                    value={newSubject.tutorialCredits}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, tutorialCredits: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                  <p className="text-xs text-gray-500">1 credit = 1 tutorial/week</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Weekly Classes:</strong> {newSubject.theoryCredits} Theory +{" "}
                  {Math.ceil(newSubject.labCredits / 2)} Lab + {newSubject.tutorialCredits} Tutorial
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddSubject}>Add Subject</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Subject List</CardTitle>
          <CardDescription>All subjects with their credit structure and weekly class requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Subject Code</th>
                  <th className="text-left p-2">Subject Name</th>
                  <th className="text-left p-2">Course/Year</th>
                  <th className="text-left p-2">Total Credits</th>
                  <th className="text-left p-2">Theory</th>
                  <th className="text-left p-2">Lab</th>
                  <th className="text-left p-2">Tutorial</th>
                  <th className="text-left p-2">Weekly Classes</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => {
                  const weeklyClasses = getWeeklyClasses(subject)
                  return (
                    <tr key={subject.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-mono text-sm">{subject.code}</td>
                      <td className="p-2 font-medium">{subject.name}</td>
                      <td className="p-2">
                        {subject.course} - {subject.year}
                        {subject.year === "1" ? "st" : subject.year === "2" ? "nd" : subject.year === "3" ? "rd" : "th"}{" "}
                        Year
                      </td>
                      <td className="p-2 text-center">{subject.totalCredits}</td>
                      <td className="p-2 text-center">{subject.theoryCredits}</td>
                      <td className="p-2 text-center">{subject.labCredits}</td>
                      <td className="p-2 text-center">{subject.tutorialCredits}</td>
                      <td className="p-2">
                        <div className="text-xs space-y-1">
                          {weeklyClasses.theory > 0 && (
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              Theory: {weeklyClasses.theory}/week
                            </div>
                          )}
                          {weeklyClasses.lab > 0 && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              Lab: {weeklyClasses.lab}/week
                            </div>
                          )}
                          {weeklyClasses.tutorial > 0 && (
                            <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              Tutorial: {weeklyClasses.tutorial}/week
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Credit System Guide</CardTitle>
          <CardDescription>Understanding the Indian university credit system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Theory Credits</h4>
              <p className="text-sm text-blue-800">
                1 Credit = 1 Hour per week
                <br />
                Lecture-based classroom teaching
                <br />
                Example: 3 Theory Credits = 3 classes per week
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Lab/Practical Credits</h4>
              <p className="text-sm text-green-800">
                2 Credits = 1 Lab Session per week
                <br />
                Hands-on practical work (2-3 hours)
                <br />
                Example: 4 Lab Credits = 2 lab sessions per week
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Tutorial Credits</h4>
              <p className="text-sm text-purple-800">
                1 Credit = 1 Hour per week
                <br />
                Small group discussions/problem solving
                <br />
                Example: 1 Tutorial Credit = 1 tutorial per week
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SchedulesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Schedule Views</h2>
        <p className="text-gray-600">View and print different schedule formats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty-wise Schedule</CardTitle>
            <CardDescription>View schedules organized by faculty members</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Users className="w-4 h-4 mr-2" />
              View Faculty Schedules
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room-wise Schedule</CardTitle>
            <CardDescription>View schedules organized by rooms and labs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              View Room Schedules
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course-wise Schedule</CardTitle>
            <CardDescription>View schedules organized by courses and sections</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              View Course Schedules
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Print Schedules</CardTitle>
          <CardDescription>Generate printable schedules with college branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Schedule Type</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Choose schedule type</option>
                <option value="faculty">Faculty-wise</option>
                <option value="room">Room-wise</option>
                <option value="course">Course-wise</option>
                <option value="weekly">Weekly Overview</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Select Format</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="print">Direct Print</option>
              </select>
            </div>
          </div>
          <Button className="w-full">Generate Printable Schedule</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Configure system settings and integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Configure automatic email notifications to students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Send timetable updates to students</Label>
                <p className="text-sm text-gray-600">Automatically notify students when schedules change</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Template</Label>
              <textarea
                className="w-full p-2 border rounded-md h-24"
                placeholder="Customize email template for notifications..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Calendar Integration</CardTitle>
            <CardDescription>Sync timetables with Google Calendar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Google Calendar sync</Label>
                <p className="text-sm text-gray-600">Add events to student calendars automatically</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Configure Google Calendar API
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>General system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Default Time Slots</Label>
              <div className="text-sm text-gray-600">
                9:00-10:00, 10:00-11:00, 11:00-12:00, 12:00-1:00, 1:00-2:00, 2:00-3:00, 3:00-4:00, 4:00-5:00
              </div>
              <Button variant="outline" size="sm">
                Customize Time Slots
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Working Days</Label>
              <div className="flex space-x-2 text-sm">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <label key={day} className="flex items-center space-x-1">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
