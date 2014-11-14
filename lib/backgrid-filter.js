at java.lang.Thread.run(Thread.java:745)
	at com.intellij.openapi.application.impl.ApplicationImpl$1$1.run(ApplicationImpl.java:149)

"Action Updater" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@9eb04e
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"RefCountingStorage write content helper" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@a29afa
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"Swing-Shell" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@16cba64
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at sun.awt.shell.Win32ShellFolderManager2$ComInvoker$3.run(Win32ShellFolderManager2.java:503)
	at java.lang.Thread.run(Thread.java:745)

"Change List Updater" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@1411fde
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1079)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:807)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"EditorNotifications executor" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@93421b
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"Encoding detection thread" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@1d93875
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1079)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:807)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"Document commit thread" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on com.intellij.util.containers.Queue@43025f
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Object.java:503)
	at com.intellij.psi.impl.DocumentCommitThread.b(DocumentCommitThread.java:288)
	at com.intellij.psi.impl.DocumentCommitThread.run(DocumentCommitThread.java:264)
	at java.lang.Thread.run(Thread.java:745)

"timer-int" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING
 on java.util.TaskQueue@150eab5
	at java.lang.Object.wait(Native Method)
	at java.util.TimerThread.mainLoop(Timer.java:552)
	at java.util.TimerThread.run(Timer.java:505)

"TimerQueue" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@1611afb
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:226)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2082)
	at java.util.concurrent.DelayQueue.take(DelayQueue.java:220)
	at javax.swing.TimerQueue.run(TimerQueue.java:171)
	at java.lang.Thread.run(Thread.java:745)

"Animations" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@16aa8c0
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1079)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:807)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"Alarm pool(shared)" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@16cf0a5
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"FS Synchronizer" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@8a76b4
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"FocusManager timer" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.TaskQueue@10839ce
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Object.java:503)
	at java.util.TimerThread.mainLoop(Timer.java:526)
	at java.util.TimerThread.run(Timer.java:505)

"Shared SimpleTimer" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.TaskQueue@10b310c
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Object.java:503)
	at java.util.TimerThread.mainLoop(Timer.java:526)
	at java.util.TimerThread.run(Timer.java:505)

"StoreRefreshStatusThread" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING

	at java.lang.Thread.sleep(Native Method)
	at com.intellij.util.TimeoutUtil.sleep(TimeoutUtil.java:58)
	at com.intellij.openapi.vfs.impl.local.LocalFileSystemImpl$StoreRefreshStatusThread.run(LocalFileSystemImpl.java:355)

"ApplicationImpl pooled thread 2" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING

	at java.lang.Thread.sleep(Native Method)
	at com.intellij.util.TimeoutUtil.sleep(TimeoutUtil.java:58)
	at com.intellij.util.io.BaseDataReader.doRun(BaseDataReader.java:105)
	at com.intellij.util.io.BaseDataReader$1.run(BaseDataReader.java:46)
	at com.intellij.openapi.application.impl.ApplicationImpl$9.run(ApplicationImpl.java:447)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:471)
	at java.util.concurrent.FutureTask.run(FutureTask.java:262)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)
	at com.intellij.openapi.application.impl.ApplicationImpl$1$1.run(ApplicationImpl.java:149)

"ApplicationImpl pooled thread 1" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING

	at java.lang.Thread.sleep(Native Method)
	at com.intellij.util.TimeoutUtil.sleep(TimeoutUtil.java:58)
	at com.intellij.util.io.BaseDataReader.doRun(BaseDataReader.java:105)
	at com.intellij.util.io.BaseDataReader$1.run(BaseDataReader.java:46)
	at com.intellij.openapi.application.impl.ApplicationImpl$9.run(ApplicationImpl.java:447)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:471)
	at java.util.concurrent.FutureTask.run(FutureTask.java:262)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)
	at com.intellij.openapi.application.impl.ApplicationImpl$1$1.run(ApplicationImpl.java:149)

"Flushing thread" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@5754f5
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:226)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2082)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1090)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:807)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"ZipFileCache Dispose" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@18acc15
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:226)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2082)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1090)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:807)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"Periodic tasks thread" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@15c901c
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:226)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2082)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1090)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:807)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"AWT-Shutdown" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.lang.Object@1f92625
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Object.java:503)
	at sun.awt.AWTAutoShutdown.run(AWTAutoShutdown.java:296)
	at java.lang.Thread.run(Thread.java:745)

"MessageDeliveryThread" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@374a33
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
	at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)
	at com.intellij.a.e.j.run(j.java:22)

"Java2D Disposer" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.lang.ref.ReferenceQueue$Lock@1e86ee5
	at java.lang.Object.wait(Native Method)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:135)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:151)
	at sun.java2d.Disposer.run(Disposer.java:145)
	at java.lang.Thread.run(Thread.java:745)

"ZipFileCache Dispose" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: TIMED_WAITING
 on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@c8a03e
	at sun.misc.Unsafe.park(Native Method)
	at java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:226)
	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2082)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1090)
	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:807)
	at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)

"Finalizer" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.lang.ref.ReferenceQueue$Lock@190563c
	at java.lang.Object.wait(Native Method)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:135)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:151)
	at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)

"Reference Handler" prio=0 tid=0x0 nid=0x0 waiting on condition
     java.lang.Thread.State: WAITING
 on java.lang.ref.Reference$Lock@10d7ffe
	at java.lang.Object.wait(Native Method)
	at java.lang.Object.wait(Object.java:503)
	at java.lang.ref.Reference$ReferenceHandler.run(Reference.java:133)

                                                                                                                                                                                                                                                                                                                                                                                                                    '´)X+ öNÌ÷7Ù@~Ÿµ›¬hAqaôØOˆy∫û∂@=§ùÈıã;3€X ⁄∆yƒHù¡®ÙbÇnBß 2µ≥;d∑≠˚∑Ñ«`M\ï†ÚD•à‰$2◊ÃıuæEü˚RvI¢Mî≤ÜÑóDØ;µ~W◊æÓú<˛xkØ
 FÕ
∞¸£Ò˘∂4aAò ˜_ÜìL@H–mƒvX?ê'ƒÇæ¿ú
*qD–¢ák©òìÎœqY?*b˜Bw¸¥;`j_¡‘≤^…Ï<àB>«∞·]‹Ì¡ÔR“7ÍcﬁÈu	ã∫ÅDôXa`;◊·å∫5	7á	»™©ÁÊ‹¨–
Ü
‹\∂}„÷¯ò≥≈Ò?£  AöÄë&3ó˛Ú‰H>¬ó˜^[Höar‰–©Ö˘·ß›î≥ÂHâ¢õ©≠klˆ÷ƒäiΩ~	FŸΩÅmlÅ@/XÄÎæŒ9Ån¡û—w†Œí æwMóg:úÚ›ÙR≠–4OoL@Œ Ò4ë2ë˜i∂UÄ≥»^Y	-x]qjehñ®2ˆ
i…†Ô≈|Ø¨Ñ-ÎÍ*‚pIŸ◊õ‹˛HÅ!»Ir_âçáÿF2≠áº]‘	ª,||åWW„⁄§¿Oƒ4e8˚z8 ß)Nß	$4l¿éïπâinBvpcF|Ç˙˘	b>ÒÅ¿∑Ò Vh‚⁄¿§ò8ùzÅ˙S_ ≈Á∏„ΩkqÙÀiæ∏Ô®ãú$'g(f’©È
ô"4u"À:œ…Ò¯€PJ¨’5xÿerÃá4ÑÛCºY—|®	qΩ„$∏
ÄÜﬂ‰u* p2ìÚ≤£—`´Ó*=#ıiæ‹2(’¥"K$)ôœ©|}X$ƒöÎDÃ9¨+Á£aêé–Â`√+ô∂¢ï1ó^åå¿ÁÛ„=†ÓÉÿCêH‰T©-ê¯ÿEı«Œh‰‹g≤jd∑⁄,2oK˛‹ä´U#™'„PˇuA+nàÖ<o$0@ı ¥
·Ub‡∫Ü)˙PZd¡p“›™≠≠fÇ_Ä9üy·P/„<`Û8∞VW]ÿ*P«9ú·Œ0™R∫7•’Q1(~ö«¨∞L¥ÀD3ºíg ﬂn$Õ ©Œ∞7^]]J9r4EÂÅÄË˚ç #pï‡˙’¯o“œ»Ì
BºôÊ¢ç)∞©C[/◊˜¿û¬≈i!≥:ãaÑ≠®ºTdpmaú“⁄ C-)”-…h˛ãÏ0bk›!ÎaIÆáOh}‹°2@26ÊÕ¯$L1i?vÆ#Øåª√äùi/p@ˆ„T(Zu±ÄÖ,"‚ªﬁ≤Ï´q{=Øè¨Ï„ˆ÷µ”ˇAƒ‚˘ÆFW±ÃË2:‰të!Ô#ä¸Í€ ¨Y°65%P4DQA3UMòŸQ3U
bÇo◊ﬂ¯MM3◊5U≈b™˘÷Øˇ©≥ë'Øk4À≥.:ÜnT˚õ˚≈bÇÂîHáÙ≠n5¨UøqÄ˙¢ôLÒ/ÑRœU§Bò;DEaùE0‡ IZHÂÅ√Xî„‘|ñ	cëÑ¥î∑ƒıàêÂ94-∑˝˚Bg¥DÆ¯é†¢.¬`à#¶ó1æ0T†Rf	ÃØÒ˘u	ÏuáTèÅ⁄†1œ˜≈˘UæØ˜	– p›/g]…Mœ¸∂¨ \æÊ/g\LöYK¯3.◊O⁄J7ãä_÷	πi :Ÿ¥Ø‘•T‹‡=]íi23Fn™r∑íY∂Í€∂kπkkÇ/ùÓpUhwX–;A~bòä
