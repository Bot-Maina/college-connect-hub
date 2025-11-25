export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          id: string
          priority: string
          published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          id?: string
          priority?: string
          published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          priority?: string
          published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          feedback: string | null
          file_url: string | null
          grade: number | null
          graded_at: string | null
          graded_by: string | null
          id: string
          status: string
          student_id: string
          submission_text: string | null
          submitted_at: string
        }
        Insert: {
          assignment_id: string
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          status?: string
          student_id: string
          submission_text?: string | null
          submitted_at?: string
        }
        Update: {
          assignment_id?: string
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          status?: string
          student_id?: string
          submission_text?: string | null
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          assignment_type: string
          course_id: string
          created_at: string
          created_by: string
          description: string | null
          due_date: string
          id: string
          points: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assignment_type?: string
          course_id: string
          created_at?: string
          created_by: string
          description?: string | null
          due_date: string
          id?: string
          points?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assignment_type?: string
          course_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string
          id?: string
          points?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          all_day: boolean
          course_id: string | null
          created_at: string
          created_by: string
          description: string | null
          end_time: string
          event_type: string
          id: string
          location: string | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          all_day?: boolean
          course_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          end_time: string
          event_type: string
          id?: string
          location?: string | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          all_day?: boolean
          course_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          end_time?: string
          event_type?: string
          id?: string
          location?: string | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      chapel_attendance: {
        Row: {
          attended: boolean | null
          created_at: string | null
          event_date: string
          event_name: string
          event_type: string
          id: string
          reflection: string | null
          user_id: string
        }
        Insert: {
          attended?: boolean | null
          created_at?: string | null
          event_date: string
          event_name: string
          event_type: string
          id?: string
          reflection?: string | null
          user_id: string
        }
        Update: {
          attended?: boolean | null
          created_at?: string | null
          event_date?: string
          event_name?: string
          event_type?: string
          id?: string
          reflection?: string | null
          user_id?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          course_id: string
          enrolled_at: string
          grade: string | null
          id: string
          status: string
          student_id: string
        }
        Insert: {
          course_id: string
          enrolled_at?: string
          grade?: string | null
          id?: string
          status?: string
          student_id: string
        }
        Update: {
          course_id?: string
          enrolled_at?: string
          grade?: string | null
          id?: string
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          course_code: string
          course_name: string
          created_at: string
          credits: number
          description: string | null
          id: string
          instructor_id: string
          max_students: number | null
          semester: string
          status: string
          updated_at: string
          year: number
        }
        Insert: {
          course_code: string
          course_name: string
          created_at?: string
          credits?: number
          description?: string | null
          id?: string
          instructor_id: string
          max_students?: number | null
          semester: string
          status?: string
          updated_at?: string
          year: number
        }
        Update: {
          course_code?: string
          course_name?: string
          created_at?: string
          credits?: number
          description?: string | null
          id?: string
          instructor_id?: string
          max_students?: number | null
          semester?: string
          status?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      credit_transfers: {
        Row: {
          completion_date: string | null
          course_code: string | null
          course_name: string
          created_at: string | null
          credits_earned: number | null
          grade: string | null
          id: string
          institution_name: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completion_date?: string | null
          course_code?: string | null
          course_name: string
          created_at?: string | null
          credits_earned?: number | null
          grade?: string | null
          id?: string
          institution_name: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completion_date?: string | null
          course_code?: string | null
          course_name?: string
          created_at?: string | null
          credits_earned?: number | null
          grade?: string | null
          id?: string
          institution_name?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      library_resources: {
        Row: {
          access_level: string | null
          author: string | null
          category: string
          created_at: string | null
          description: string | null
          file_url: string | null
          id: string
          isbn: string | null
          publication_year: number | null
          publisher: string | null
          resource_type: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          access_level?: string | null
          author?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          isbn?: string | null
          publication_year?: number | null
          publisher?: string | null
          resource_type: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          access_level?: string | null
          author?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          isbn?: string | null
          publication_year?: number | null
          publisher?: string | null
          resource_type?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          recipient_id: string
          replied_to: string | null
          sender_id: string
          subject: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id: string
          replied_to?: string | null
          sender_id: string
          subject: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id?: string
          replied_to?: string | null
          sender_id?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_replied_to_fkey"
            columns: ["replied_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      ministry_opportunities: {
        Row: {
          contact_email: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          hours_required: number | null
          id: string
          location: string | null
          ministry_type: string
          requirements: string | null
          spots_available: number | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hours_required?: number | null
          id?: string
          location?: string | null
          ministry_type: string
          requirements?: string | null
          spots_available?: number | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hours_required?: number | null
          id?: string
          location?: string | null
          ministry_type?: string
          requirements?: string | null
          spots_available?: number | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ministry_participation: {
        Row: {
          created_at: string | null
          hours_completed: number | null
          id: string
          opportunity_id: string
          status: string | null
          student_reflection: string | null
          supervisor_notes: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          hours_completed?: number | null
          id?: string
          opportunity_id: string
          status?: string | null
          student_reflection?: string | null
          supervisor_notes?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          hours_completed?: number | null
          id?: string
          opportunity_id?: string
          status?: string | null
          student_reflection?: string | null
          supervisor_notes?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ministry_participation_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "ministry_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_read_status: {
        Row: {
          announcement_id: string
          created_at: string
          id: string
          read_at: string
          user_id: string
        }
        Insert: {
          announcement_id: string
          created_at?: string
          id?: string
          read_at?: string
          user_id: string
        }
        Update: {
          announcement_id?: string
          created_at?: string
          id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_read_status_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "announcements"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          enrollment_date: string | null
          expected_graduation: string | null
          full_name: string | null
          id: string
          phone: string | null
          program: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          enrollment_date?: string | null
          expected_graduation?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          program?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          enrollment_date?: string | null
          expected_graduation?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          program?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "faculty" | "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "faculty", "admin", "staff"],
    },
  },
} as const
