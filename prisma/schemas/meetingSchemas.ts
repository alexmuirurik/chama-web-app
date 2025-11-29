import z from "zod";

export const MeetingSchema = z.object({
    meetingTitle: z.string(),
    meetingDate: z.date(),
    memberId: z.string(),
})