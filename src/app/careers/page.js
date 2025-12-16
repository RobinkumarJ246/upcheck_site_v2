'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaFilter,
  FaSearch,
  FaGraduationCap,
  FaCalendarAlt,
  FaUserClock,
  FaTags
} from 'react-icons/fa'
import { BiSolidBadgeCheck } from 'react-icons/bi'
import { IoFlashSharp } from 'react-icons/io5'

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedSkill, setSelectedSkill] = useState('all')

  // Role type constants
  const ROLE_TYPES = {
    INTERNSHIP: 'Internship',
    FULL_TIME: 'Full-time'
  }

  // Badge types
  const BADGE_TYPES = {
    URGENT: {
      text: 'Urgent hire',
      icon: IoFlashSharp,
      className: 'bg-red-100 text-red-600'
    },
    NEW: {
      text: 'Just opened',
      icon: BiSolidBadgeCheck,
      className: 'bg-green-100 text-green-600'
    },
    LIMITED: {
      text: 'Limited positions',
      icon: FaUserClock,
      className: 'bg-yellow-100 text-yellow-600'
    }
  }

  // All available skills
  const allSkills = [
    'Electronics',
    'IoT',
    'PCB Design',
    'JavaScript',
    'React Native',
    'Mobile Development',
    'C/C++',
    'Embedded Systems',
    'Microcontrollers'
  ]

  // Job listings
  const jobs = [
    {
      id: 1,
      title: "Hardware Engineer",
      type: ROLE_TYPES.INTERNSHIP,
      location: "Remote",
      duration: "1-3 months",
      isFlexible: true,
      isExtendable: true,
      publishedDate: "2025-04-22",
      description: "Join our team to design and develop innovative hardware solutions for aquaculture monitoring systems. Great opportunity to learn and contribute to real-world IoT applications.",
      requirements: [
        "Basic understanding of electronics",
        "Interest in IoT and sensor systems",
        "Willingness to learn PCB design",
        "Good problem-solving skills"
      ],
      responsibilities: [
        "Assist in hardware prototyping",
        "Help with PCB design and testing",
        "Document technical specifications",
        "Collaborate with firmware team"
      ],
      skills: ['Electronics', 'IoT', 'PCB Design'],
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdbB3VKuGnCoWRaS83x8hp9Hb6Vs7TRz4k_YKoVXhULHBu7TQ/viewform?usp=header",
      badge: BADGE_TYPES.NEW
    },
    {
      id: 2,
      title: "App Developer",
      type: ROLE_TYPES.INTERNSHIP,
      location: "Remote",
      duration: "1-3 months",
      isFlexible: true,
      isExtendable: true,
      publishedDate: "2025-04-21",
      description: "Work on our mobile application that helps shrimp farmers monitor and manage their farms efficiently. Perfect opportunity for aspiring mobile developers.",
      requirements: [
        "Basic programming knowledge",
        "Interest in mobile development",
        "Understanding of JavaScript",
        "Eagerness to learn React Native"
      ],
      responsibilities: [
        "Help develop mobile app features",
        "Assist in UI/UX implementation",
        "Write clean, maintainable code",
        "Participate in code reviews"
      ],
      skills: ['JavaScript', 'React Native', 'Mobile Development'],
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdbB3VKuGnCoWRaS83x8hp9Hb6Vs7TRz4k_YKoVXhULHBu7TQ/viewform?usp=header",
      badge: BADGE_TYPES.NEW
    },
    {
      id: 3,
      title: "Firmware Developer",
      type: ROLE_TYPES.INTERNSHIP,
      location: "Remote",
      duration: "1-3 months",
      isFlexible: true,
      isExtendable: true,
      publishedDate: "2025-04-20",
      description: "Join our firmware team to develop embedded systems for IoT devices used in aquaculture monitoring. Great opportunity to learn embedded development.",
      requirements: [
        "Basic C/C++ knowledge",
        "Interest in embedded systems",
        "Understanding of microcontrollers",
        "Willingness to learn"
      ],
      responsibilities: [
        "Assist in firmware development",
        "Help with debugging and testing",
        "Document code and processes",
        "Work on optimization tasks"
      ],
      skills: ['C/C++', 'Embedded Systems', 'Microcontrollers'],
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdbB3VKuGnCoWRaS83x8hp9Hb6Vs7TRz4k_YKoVXhULHBu7TQ/viewform?usp=header",
      badge: BADGE_TYPES.NEW
    }
  ]

  // Sort jobs based on selected criteria
  const sortJobs = (jobsToSort) => {
    return [...jobsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedDate) - new Date(a.publishedDate)
        case 'oldest':
          return new Date(a.publishedDate) - new Date(b.publishedDate)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }

  // Filter jobs based on search, type and skills
  const filteredJobs = jobs.filter(job => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.requirements.some(req => req.toLowerCase().includes(searchLower)) ||
      job.responsibilities.some(resp => resp.toLowerCase().includes(searchLower)) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchLower))

    const matchesType = selectedType === 'all' || job.type === selectedType
    const matchesSkill = selectedSkill === 'all' || job.skills.includes(selectedSkill)

    return matchesSearch && matchesType && matchesSkill
  })

  // Sort filtered jobs
  const sortedJobs = sortJobs(filteredJobs)

  // Group jobs by type
  const fullTimeJobs = sortedJobs.filter(job => job.type === ROLE_TYPES.FULL_TIME)
  const internships = sortedJobs.filter(job => job.type === ROLE_TYPES.INTERNSHIP)

  const JobCard = ({ job }) => (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header with Title and Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
            {job.title}
          </h3>
          {job.badge && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${job.badge.className} whitespace-nowrap`}>
              <job.badge.icon className="w-4 h-4" />
              <span>{job.badge.text}</span>
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaClock className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" />
            <span>{job.duration}</span>
          </div>
        </div>

        {/* Description with hover to show full */}
        <div className="relative group mb-4">
          <p className="text-gray-600 line-clamp-2 group-hover:line-clamp-none">
            {job.description}
          </p>
        </div>

        {/* Requirements with hover expansion */}
        <div className="mb-4 flex-grow">
          <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
          <ul className="text-gray-600 text-sm space-y-1 relative group">
            <div className="line-clamp-3 group-hover:line-clamp-none">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </div>
          </ul>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FaTags className="text-teal-600" />
            <span className="text-sm font-medium">Required Skills:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Button - Fixed at bottom */}
        <Link
          href={job.formLink}
          className="inline-block w-full text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300"
        >
          Apply Now
        </Link>
      </div>
    </div>
  )

  const NoPositionsMessage = ({ type }) => (
    <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-lg">
      <FaBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No {type} Positions Available</h3>
      <p className="text-gray-600">
        We currently don't have any {type.toLowerCase()} positions available.
        Please check back later for new opportunities.
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Join Our Mission
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Start your journey in aquaculture technology. Help us revolutionize shrimp farming while learning and growing with us.
          </p>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Internship Notice */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-start space-x-3">
              <FaGraduationCap className="text-blue-600 text-xl mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">About Our Internships</h3>
                <div className="space-y-2 text-slate-600">
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    Duration: 1-3 months (Flexible & Extendable)
                  </p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    Fully Remote Position
                  </p>
                  <p className="flex items-center">
                    <FaBriefcase className="mr-2 text-blue-500" />
                    Potential for Full-time Conversion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] p-6 mb-8 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search positions, skills, or requirements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-50 text-slate-900 placeholder-slate-400"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-slate-50 text-slate-900"
                >
                  <option value="all">All Types</option>
                  {Object.values(ROLE_TYPES).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              {/* Skills Filter */}
              <div className="relative">
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-slate-50 text-slate-900"
                >
                  <option value="all">All Skills</option>
                  {allSkills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <FaTags className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              {/* Sort Options */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-slate-50 text-slate-900"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                </select>
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Full-time Positions Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Full-time Positions</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fullTimeJobs.length > 0 ? (
                fullTimeJobs.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <NoPositionsMessage type="Full-time" />
              )}
            </div>
          </div>

          {/* Internship Positions Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Internship Positions</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {internships.length > 0 ? (
                internships.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <NoPositionsMessage type="Internship" />
              )}
            </div>
          </div>

          {/* No Results Message */}
          {sortedJobs.length === 0 && searchTerm && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-slate-100">
              <FaSearch className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Positions Found</h3>
              <p className="text-slate-600">
                We couldn't find any positions matching your search criteria.
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}