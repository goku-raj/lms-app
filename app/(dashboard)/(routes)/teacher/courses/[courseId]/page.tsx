import { IconBadge } from "@/components/icons-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { boolean } from "zod";


const CourseIdPage = async ({
    params
}:{
    params:{courseId: string}
}) => {

    const {userId} = auth();

    if(!userId){
        return redirect('/')
    };

    const course = await db.course.findUnique({
        where:{
            id: params.courseId
        }
    });

    if(!course){
        return redirect('/')
    }

    const requiredField = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];
    const totalFields = requiredField.length;
    const completedFields = requiredField.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        completed all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge size={'sm'} icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CourseIdPage;